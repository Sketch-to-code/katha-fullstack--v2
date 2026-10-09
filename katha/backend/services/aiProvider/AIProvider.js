// This is the contract every AI/TTS adapter must honour. JavaScript has no
// interfaces, so we document the shape here and throw if a subclass forgets
// to implement a method - it's the closest thing to Liskov substitution
// enforcement available without TypeScript.
//
//   summarize(text: string): Promise<string>
//   explain(text: string): Promise<string>
//   narrate(text: string): Promise<{ audioUrl: string, durationSec: number }>
//
// AcademicModeFacade depends only on this contract, never on a concrete
// vendor SDK - that's what lets katha swap OpenAI/Anthropic/a local model
// in without touching a single controller.
class AIProvider {
  async summarize(_text) {
    throw new Error('summarize() not implemented');
  }

  async explain(_text) {
    throw new Error('explain() not implemented');
  }

  async narrate(_text) {
    throw new Error('narrate() not implemented');
  }
}

module.exports = AIProvider;
