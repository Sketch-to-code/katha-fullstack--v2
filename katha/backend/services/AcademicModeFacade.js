const MockLLMAdapter = require('./aiProvider/MockLLMAdapter');

// Facade pattern: AIController and, on the frontend, AIPanel only ever call
// academicMode.assist(selection, mode) instead of juggling three separate
// services and their individual error states. Swapping the mocked adapter
// for a real OpenAIAdapter/AnthropicAdapter later is a one-line change here
// and nowhere else.
class AcademicModeFacade {
  constructor(provider = new MockLLMAdapter()) {
    this.provider = provider;
  }

  async assist(selectionText, mode) {
    if (!selectionText || !selectionText.trim()) {
      throw new Error('No text was selected.');
    }

    switch (mode) {
      case 'summarize':
        return { mode, result: await this.provider.summarize(selectionText) };
      case 'explain':
        return { mode, result: await this.provider.explain(selectionText) };
      case 'narrate':
        return { mode, result: await this.provider.narrate(selectionText) };
      default:
        throw new Error(`Unknown assist mode: ${mode}`);
    }
  }
}

module.exports = new AcademicModeFacade();
