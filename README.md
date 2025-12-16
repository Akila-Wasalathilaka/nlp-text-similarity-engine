# 🧠 Humanizer Engine

A production-ready text humanization engine that transforms AI-generated or overly polished text into natural, human-written content while preserving meaning and accuracy.

## ✨ Features

- **Multiple Writing Modes**: Academic (student & professional), Professional, Casual-formal
- **Natural Sentence Flow**: Varied rhythm, burstiness, and lexical diversity
- **Meaning Preservation**: Maintains facts, tone, and core message
- **Production Ready**: Built with TypeScript, Fastify, and proper error handling
- **Scalable Architecture**: Modular design with clear separation of concerns

## 🚀 Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment**:
```bash
cp .env.example .env
# Add your Mistral API key to .env
```

3. **Run in development**:
```bash
npm run dev
```

4. **Build for production**:
```bash
npm run build
npm start
```

## 📡 API Usage

### Rewrite Text
```bash
POST /rewrite
Content-Type: application/json

{
  "text": "Your text to humanize here...",
  "mode": "professional",
  "preserveFormatting": true
}
```

### Available Modes
```bash
GET /modes
```

### Health Check
```bash
GET /health
```

## 🎯 Writing Modes

- **academic-student**: Clear, formal, natural academic writing
- **academic-professional**: Structured, precise, scholarly tone  
- **professional**: Clean, direct, business-appropriate
- **casual-formal**: Natural, conversational yet professional

## 🏗️ Architecture

```
Input → Normalizer → Segmenter → Rewrite Controller → Mistral API → Post-Processor → Output
```

### Core Modules

- **Normalizer**: Input cleaning and validation
- **Segmenter**: Paragraph-based text chunking
- **Rewrite Controller**: Orchestrates the humanization process
- **Mistral Client**: Handles AI rewriting with proper parameters
- **Post-Processor**: Final cleanup and quality metrics

## 📊 Quality Metrics

The engine tracks:
- Sentence length variance (burstiness)
- Repetition rate (lexical diversity)
- Readability improvement
- Processing time

## 🔧 Configuration

Key parameters per writing mode:
- Average sentence length
- Sentence variation level
- Hedging frequency
- Complexity level
- Formality score

## 🛡️ Ethical Use

This tool is designed for:
- ✅ Writing refinement and style improvement
- ✅ Making text more natural and readable
- ✅ Academic and professional writing enhancement

Not intended for:
- ❌ Plagiarism or academic dishonesty
- ❌ Bypassing AI detection systems
- ❌ Impersonation or deception

## 📝 Example

**Input** (AI-generated):
> "Additionally, it is important to note that machine learning algorithms demonstrate significant potential. Furthermore, these systems can process vast amounts of data efficiently."

**Output** (Humanized):
> "Machine learning algorithms show real promise in handling large datasets. These systems can crunch through massive amounts of information quickly and effectively."

## 🔑 Environment Variables

```bash
MISTRAL_API_KEY=your_mistral_api_key
PORT=3000
```

## 📦 Dependencies

- **fastify**: High-performance web framework
- **zod**: Runtime type validation
- **@fastify/cors**: CORS support
- **dotenv**: Environment configuration

## 🚦 Status Codes

- `200`: Success
- `400`: Bad request (validation error)
- `500`: Server error

Built with ❤️ for natural, human-like writing.