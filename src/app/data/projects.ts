export interface ProjectLink {
  label: string;
  url: string;
  isPlaceholder?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  metrics?: string;
  highlights?: string[];
  links: ProjectLink[];
  isPlaceholder?: boolean;
}

export const projects: Project[] = [
  {
    id: 'rag-document-qa',
    title: 'RAG Document Q&A Chatbot',
    description:
      'High-precision retrieval-augmented generation engine engineered for long-form technical documentation and domain manuals. Features custom metadata chunking, HNSW vector indexing, and cross-encoder reranking to ensure rigorous context grounding without hallucinations.',
    stack: ['Python', 'FastAPI', 'LangChain', 'FAISS', 'HuggingFace', 'Docker'],
    metrics: '92% answer relevance across 400+ evaluation queries with sub-second retrieval',
    highlights: [
      'Engineered an HNSW-indexed FAISS vector pipeline with BAI/bge embeddings running local fp16 inference.',
      'Constructed dynamic chunking with metadata-anchored headers to preserve document hierarchy.',
      'Containerized with FastAPI for minimal p95 latency (< 850ms) and reproducible multi-environment deployment.',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/chargedleo/rag-document-qa',
        isPlaceholder: true,
      },
    ],
  },
  {
    id: 'ai-debater',
    title: 'AI Debater',
    description:
      'Dialectic reasoning system orchestrating real-time structured debates and counter-argument synthesis. Uses quantized local reasoning models to minimize inference latency and compute overhead while preserving multi-turn logical consistency.',
    stack: ['Python', 'Ollama', 'DeepSeek R1', 'Streamlit', 'Docker'],
    metrics: 'Sub-2-second response latency with 28% GPU memory reduction via 4-bit quantization',
    highlights: [
      'Integrated DeepSeek R1 reasoning checkpoints served locally via Ollama with zero external API dependencies.',
      'Achieved a 28% reduction in VRAM consumption utilizing AWQ/GGUF quantization without significant reasoning degradation.',
      'Designed an asynchronous streaming frontend in Streamlit demonstrating continuous chain-of-thought argument generation.',
    ],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/chargedleo/ai-debater',
        isPlaceholder: true,
      },
    ],
  },
  {
    id: 'game-dev-project',
    title: 'Game Engine / Systems Project',
    description:
      'Systems programming and interactive physics exploration focusing on spatial partitioning, deterministic state management, and real-time rendering pipelines. Currently in active development.',
    stack: ['C#', 'Godot / Unity', 'HLSL', 'Algorithms'],
    metrics: 'Active development — title and architecture whitepaper TBD',
    highlights: [
      'Focusing on cache-friendly entity architecture and deterministic simulation ticks.',
      'Custom spatial grid optimization for collision query scaling.',
    ],
    links: [
      {
        label: 'Repository [Coming Soon]',
        url: 'https://github.com/chargedleo',
        isPlaceholder: true,
      },
    ],
    isPlaceholder: true,
  },
];
