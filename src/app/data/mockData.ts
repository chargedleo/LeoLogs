export interface Author {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  longBio: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  stats: {
    posts: number;
    views: string;
    followers: string;
  };
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  color: string;
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'code'; code: string; language: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; text: string; variant: 'info' | 'tip' | 'warning' };

export interface TOCItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  likes: number;
  views: number;
  isFeatured: boolean;
  isTrending: boolean;
  content: ContentBlock[];
  toc: TOCItem[];
}

export const authors: Author[] = [
  {
    id: 'a1',
    slug: 'om-karmuse',
    name: 'Om Karmuse',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
    role: 'AI Engineer & Technical Writer',
    bio: 'Building the future of AI at the intersection of research and product. 7 years at DeepMind, now independent.',
    longBio: "Om Karmuse is an AI Engineer and technical writer with over a decade of experience building large-scale machine learning systems. He spent seven years at DeepMind working on reinforcement learning and language models before going independent to write and consult. Om is passionate about making complex AI concepts accessible to engineers and curious minds alike. His writing has been read by over 2 million people, and he is a frequent speaker at NeurIPS and ICLR. When he's not writing, he's training models, hiking in the Pacific Northwest, or brewing pour-over coffee.",
    social: {
      twitter: 'omkarmuse',
      github: 'omkarmuse',
      linkedin: 'om-karmuse',
      website: 'omkarmuse.dev',
    },
    stats: { posts: 84, views: '2.4M', followers: '38K' },
  },
  {
    id: 'a2',
    slug: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    role: 'Senior Software Engineer',
    bio: 'Full-stack engineer obsessed with developer experience, TypeScript, and building tools that spark joy.',
    longBio: "Sarah Mitchell is a Senior Software Engineer who has spent the last eight years building developer tools, open source libraries, and high-scale web applications. She's contributed to the TypeScript compiler, authored several popular npm packages, and writes about the art and science of software craftsmanship. She believes great code is a form of communication, and great documentation is a form of care. Currently working on the platform team at a Bay Area fintech startup.",
    social: {
      twitter: 'sarahm_dev',
      github: 'sarahmitchell',
      linkedin: 'sarah-mitchell-eng',
    },
    stats: { posts: 52, views: '980K', followers: '22K' },
  },
  {
    id: 'a3',
    slug: 'marcus-rodriguez',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&auto=format',
    role: 'Tech Philosopher & Essayist',
    bio: 'Exploring the ethics, philosophy, and societal implications of emerging technology through long-form essays.',
    longBio: "Marcus Rodriguez writes at the intersection of technology, philosophy, and society. With a background in computer science and a master's in philosophy from Oxford, he brings a rare dual lens to questions about AI alignment, digital ethics, and the future of human cognition. His essays have appeared in Wired, Aeon, and MIT Technology Review. He runs a newsletter with 60,000+ subscribers who want to think more carefully about where technology is taking us.",
    social: {
      twitter: 'marcusrod_thinks',
      linkedin: 'marcus-rodriguez-phi',
      website: 'marcusrodriguez.io',
    },
    stats: { posts: 31, views: '1.8M', followers: '61K' },
  },
  {
    id: 'a4',
    slug: 'priya-sharma',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&auto=format',
    role: 'ML Engineer & Open Source Contributor',
    bio: 'Turning research papers into production systems. Contributor to Hugging Face, PyTorch, and LangChain.',
    longBio: "Priya Sharma is a machine learning engineer who specializes in taking bleeding-edge AI research and turning it into robust, production-ready systems. She's a core contributor to Hugging Face Transformers and has shipped ML features used by millions. She writes practical, implementation-first content covering everything from fine-tuning LLMs to deploying vector databases at scale. Based in London, she mentors early-career engineers through her free monthly office hours.",
    social: {
      twitter: 'priyasharma_ml',
      github: 'priyasharma',
      linkedin: 'priya-sharma-ml',
    },
    stats: { posts: 67, views: '1.3M', followers: '29K' },
  },
];

export const categories: Category[] = [
  { id: 'c1', slug: 'artificial-intelligence', name: 'Artificial Intelligence', icon: '🤖', description: 'LLMs, neural networks, and the frontier of AI research.', count: 34, color: '#1A1A1A' },
  { id: 'c2', slug: 'programming', name: 'Programming', icon: '💻', description: 'Clean code, architecture, and engineering best practices.', count: 51, color: '#2D2D2D' },
  { id: 'c3', slug: 'technology', name: 'Technology', icon: '⚡', description: 'Cloud, infrastructure, dev tools, and the tech industry.', count: 28, color: '#404040' },
  { id: 'c4', slug: 'machine-learning', name: 'Machine Learning', icon: '📊', description: 'Practical ML from training to deployment at scale.', count: 42, color: '#525252' },
  { id: 'c5', slug: 'personal', name: 'Personal', icon: '✍️', description: 'Career reflections, lessons learned, and creative essays.', count: 19, color: '#404040' },
  { id: 'c6', slug: 'open-source', name: 'Open Source', icon: '🔓', description: 'Contributing, maintaining, and building in the open.', count: 16, color: '#525252' },
  { id: 'c7', slug: 'web-development', name: 'Web Development', icon: '🌐', description: 'React, TypeScript, CSS, and the modern web stack.', count: 38, color: '#2D2D2D' },
  { id: 'c8', slug: 'ethics', name: 'AI Ethics', icon: '⚖️', description: 'Alignment, fairness, and the societal impact of AI.', count: 11, color: '#717171' },
];

export const allTags = [
  'LLMs', 'Python', 'TypeScript', 'React', 'Transformers', 'RAG', 'Vector DB',
  'Neural Networks', 'GPT', 'Fine-tuning', 'DevOps', 'Kubernetes', 'Open Source',
  'Career', 'Writing', 'Rust', 'WebAssembly', 'GraphQL', 'Tailwind', 'Next.js',
  'Embeddings', 'RLHF', 'Claude', 'Alignment', 'Inference', 'Prompting',
];

const featuredArticleContent: ContentBlock[] = [
  {
    type: 'paragraph',
    text: 'The landscape of large language models has shifted dramatically in the past eighteen months. What began as a competition over raw benchmark performance has matured into something far more nuanced: a race toward models that reason, plan, use tools, and collaborate with humans in fundamentally new ways.',
  },
  {
    type: 'paragraph',
    text: "GPT-4's release in early 2023 felt like a watershed moment. But in retrospect, it was the beginning of a phase, not the pinnacle. Today, models from Anthropic, Google DeepMind, Meta, and others have introduced capabilities—extended context windows, multimodal reasoning, structured output, and agentic tool use—that are reshaping what we expect from AI systems.",
  },
  {
    type: 'h2',
    text: 'The Architecture Has Stabilized — The Training Has Not',
    id: 'architecture-stabilized',
  },
  {
    type: 'paragraph',
    text: "The transformer architecture, introduced by Vaswani et al. in 2017, has proven remarkably durable. Nearly every frontier LLM today is a transformer variant. The real evolution is happening in training pipelines, data curation, alignment techniques, and inference-time compute.",
  },
  {
    type: 'code',
    language: 'python',
    code: `import anthropic

client = anthropic.Anthropic()

# Claude 4's extended thinking allows the model
# to reason step-by-step before answering
response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=16000,
    thinking={
        "type": "enabled",
        "budget_tokens": 10000
    },
    messages=[{
        "role": "user",
        "content": "Prove that the square root of 2 is irrational."
    }]
)

for block in response.content:
    if block.type == "thinking":
        print("Chain of thought:", block.thinking[:200])
    elif block.type == "text":
        print("Answer:", block.text)`,
  },
  {
    type: 'paragraph',
    text: 'RLHF (Reinforcement Learning from Human Feedback) gave way to Constitutional AI, which evolved into iterative approaches combining synthetic data generation, process reward models, and increasingly sophisticated preference optimization. The goal has shifted from "make the model helpful" to "make the model reliably do the right thing in novel situations."',
  },
  {
    type: 'h2',
    text: 'Reasoning as a First-Class Capability',
    id: 'reasoning-first-class',
  },
  {
    type: 'paragraph',
    text: "One of the most consequential shifts of the past year has been the explicit treatment of reasoning as something to be trained, not just emergent. OpenAI's o1 and o3, Anthropic's extended thinking in Claude, and Google's experimental reasoning modes all represent a bet that giving models dedicated compute time to \"think\" before responding produces qualitatively better outputs.",
  },
  {
    type: 'quote',
    text: "The difference between a model that answers quickly and one that thinks carefully isn't just performance — it's the entire shape of the errors it makes. Fast models fail confidently; careful models fail with uncertainty.",
    attribution: 'Dario Amodei, Anthropic CEO',
  },
  {
    type: 'paragraph',
    text: 'This chain-of-thought paradigm has deep implications. It makes models more interpretable (you can read the reasoning), more reliable on hard problems, and easier to verify. It also raises the computational cost per query significantly, which is why inference efficiency has become as important as training efficiency.',
  },
  {
    type: 'h2',
    text: 'The Rise of Agentic AI Systems',
    id: 'agentic-ai',
  },
  {
    type: 'paragraph',
    text: "Static question-answering is giving way to agents that take actions in the world. Tool use, code execution, web browsing, computer control, and multi-step planning are table-stakes capabilities for frontier models. The architectural pattern looks like this:",
  },
  {
    type: 'list',
    ordered: false,
    items: [
      'A powerful reasoning core (the LLM) that plans and decides',
      'A set of tools the model can call (search, code interpreter, APIs)',
      'A memory system that persists state across steps',
      'An orchestration layer that manages the agent loop',
      'Human-in-the-loop checkpoints for high-stakes actions',
    ],
  },
  {
    type: 'callout',
    variant: 'tip',
    text: 'When building agentic systems, design for graceful degradation. An agent that fails loudly is far better than one that silently continues down a wrong path. Implement checkpointing, rollback, and explicit uncertainty signaling.',
  },
  {
    type: 'h2',
    text: 'Multimodality Is Now Table Stakes',
    id: 'multimodality',
  },
  {
    type: 'paragraph',
    text: "GPT-4V, Gemini Ultra, Claude 3 Opus, and their successors can all process images, audio, and in some cases video alongside text. This isn't just a feature addition — it's a fundamental expansion of what a model can perceive and reason about. Medical imaging analysis, code screenshots, diagram understanding, and real-time video comprehension are becoming core use cases.",
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&h=450&fit=crop&auto=format',
    alt: 'Neural network visualization with glowing connections',
    caption: 'Modern neural networks process multiple modalities simultaneously, integrating visual and textual understanding in a unified representational space.',
  },
  {
    type: 'h2',
    text: 'What the Next 18 Months Look Like',
    id: 'next-eighteen-months',
  },
  {
    type: 'paragraph',
    text: "Based on public research directions, patent filings, and the natural evolution of the field, here's what I expect to become mainstream by late 2027:",
  },
  {
    type: 'list',
    ordered: true,
    items: [
      'Models with persistent memory that genuinely remember past conversations at scale',
      'Real-time voice and video interaction with sub-200ms latency',
      'Autonomous agents completing complex multi-day work tasks with minimal supervision',
      'Personalized models fine-tuned on-device with strict privacy guarantees',
      'Reliable mathematical and logical reasoning approaching human expert level',
    ],
  },
  {
    type: 'h2',
    text: 'The Hard Problems Remain Hard',
    id: 'hard-problems',
  },
  {
    type: 'paragraph',
    text: "For all the progress, several fundamental challenges haven't yielded to scale alone. Hallucination — the tendency for models to generate confident but false information — remains a critical barrier for high-stakes applications. Causal reasoning, genuine generalization to out-of-distribution scenarios, and long-horizon planning still lag behind human experts in many domains.",
  },
  {
    type: 'paragraph',
    text: "The alignment problem deserves special mention. As models become more capable of autonomous action, ensuring they pursue intended goals and remain responsive to correction becomes existentially important. This isn't a distant, theoretical concern — it's an engineering problem being actively worked on today at every major AI lab.",
  },
  {
    type: 'h2',
    text: 'A Note for Practitioners',
    id: 'note-for-practitioners',
  },
  {
    type: 'paragraph',
    text: "If you're building products on top of LLMs today, the most important thing you can do is invest in your evaluation infrastructure. The models will keep improving. Your ability to measure that improvement — and catch regressions — is the moat. Build evals before you build features.",
  },
  {
    type: 'code',
    language: 'python',
    code: `# A simple but powerful evaluation pattern
from anthropic import Anthropic

client = Anthropic()

def evaluate_response(
    prompt: str,
    response: str,
    criteria: list[str]
) -> dict:
    """Use a model to evaluate another model's response."""
    eval_prompt = f"""
You are an expert evaluator. Rate this response on each criterion.

Original prompt: {prompt}
Response to evaluate: {response}

Criteria to evaluate:
{chr(10).join(f'- {c}' for c in criteria)}

Return a JSON object with scores (1-5) and brief justification.
    """

    result = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1000,
        messages=[{"role": "user", "content": eval_prompt}]
    )
    return result.content[0].text`,
  },
  {
    type: 'paragraph',
    text: "The golden age of language models isn't behind us — it's barely begun. The capabilities we'll have access to in five years are likely to be as surprising to us today as GPT-4 would have been to someone in 2018. The important question isn't what the models can do, but what we choose to build with them.",
  },
];

export const articles: Article[] = [
  {
    id: '1',
    slug: 'future-of-large-language-models',
    title: 'The Future of Large Language Models: Beyond GPT-4',
    excerpt: "What comes after the current generation of LLMs? Reasoning engines, agentic systems, and multimodal understanding are reshaping what we expect from AI. Here's a practitioner's view of where we're headed.",
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop&auto=format',
    authorId: 'a1',
    categoryId: 'c1',
    tags: ['LLMs', 'GPT', 'Transformers', 'RLHF'],
    publishedAt: '2026-07-28T09:00:00Z',
    readingTime: 12,
    likes: 847,
    views: 24300,
    isFeatured: true,
    isTrending: true,
    content: featuredArticleContent,
    toc: [
      { id: 'architecture-stabilized', title: 'The Architecture Has Stabilized', level: 2 },
      { id: 'reasoning-first-class', title: 'Reasoning as a First-Class Capability', level: 2 },
      { id: 'agentic-ai', title: 'The Rise of Agentic AI Systems', level: 2 },
      { id: 'multimodality', title: 'Multimodality Is Now Table Stakes', level: 2 },
      { id: 'next-eighteen-months', title: 'What the Next 18 Months Look Like', level: 2 },
      { id: 'hard-problems', title: 'The Hard Problems Remain Hard', level: 2 },
      { id: 'note-for-practitioners', title: 'A Note for Practitioners', level: 2 },
    ],
  },
  {
    id: '2',
    slug: 'vector-databases-explained-rag',
    title: 'Vector Databases Explained: The Engine Behind RAG Systems',
    excerpt: 'Embeddings, similarity search, and approximate nearest neighbors — demystifying the infrastructure that makes retrieval-augmented generation work at production scale.',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=420&fit=crop&auto=format',
    authorId: 'a4',
    categoryId: 'c4',
    tags: ['RAG', 'Vector DB', 'Embeddings', 'Python'],
    publishedAt: '2026-07-24T09:00:00Z',
    readingTime: 10,
    likes: 612,
    views: 18900,
    isFeatured: false,
    isTrending: true,
    content: [],
    toc: [],
  },
  {
    id: '3',
    slug: 'react-server-components-mental-model',
    title: 'React Server Components: A Complete Mental Model',
    excerpt: 'Stop thinking about RSC as a performance optimization and start thinking about it as a new rendering primitive. Here\'s the mental model that finally made it click for me.',
    coverImage: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=800&h=420&fit=crop&auto=format',
    authorId: 'a2',
    categoryId: 'c7',
    tags: ['React', 'TypeScript', 'Next.js', 'Web Development'],
    publishedAt: '2026-07-20T09:00:00Z',
    readingTime: 8,
    likes: 489,
    views: 15600,
    isFeatured: false,
    isTrending: true,
    content: [],
    toc: [],
  },
  {
    id: '4',
    slug: 'why-i-left-big-tech',
    title: 'Why I Left Big Tech to Write About Technology',
    excerpt: "After seven years at Google and DeepMind, I walked away from a comfortable career to write. Here's what I learned about the tension between doing and explaining.",
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=420&fit=crop&auto=format',
    authorId: 'a1',
    categoryId: 'c5',
    tags: ['Career', 'Writing', 'Personal'],
    publishedAt: '2026-07-16T09:00:00Z',
    readingTime: 6,
    likes: 1203,
    views: 41000,
    isFeatured: false,
    isTrending: false,
    content: [],
    toc: [],
  },
  {
    id: '5',
    slug: 'typescript-5-whats-new',
    title: 'TypeScript 5.5: What\'s New and Why It Matters',
    excerpt: 'Inferred type predicates, isolated declarations, and the new module resolution modes. A practical tour of TypeScript 5.5 features that will change how you write code.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=420&fit=crop&auto=format',
    authorId: 'a2',
    categoryId: 'c2',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    publishedAt: '2026-07-12T09:00:00Z',
    readingTime: 9,
    likes: 371,
    views: 12400,
    isFeatured: false,
    isTrending: false,
    content: [],
    toc: [],
  },
  {
    id: '6',
    slug: 'philosophy-of-agi',
    title: 'The Philosophy of Artificial General Intelligence',
    excerpt: 'What do we actually mean when we say AGI? A philosophical examination of the goal posts, the assumptions baked into our definitions, and why clarity here matters more than we think.',
    coverImage: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=800&h=420&fit=crop&auto=format',
    authorId: 'a3',
    categoryId: 'c8',
    tags: ['Alignment', 'AGI', 'Ethics'],
    publishedAt: '2026-07-09T09:00:00Z',
    readingTime: 15,
    likes: 934,
    views: 31200,
    isFeatured: false,
    isTrending: true,
    content: [],
    toc: [],
  },
  {
    id: '7',
    slug: 'kubernetes-for-ml-engineers',
    title: 'Kubernetes for ML Engineers: A Practical Guide',
    excerpt: 'GPUs, distributed training jobs, model serving, and autoscaling — everything the ML engineer needs to know about running workloads on Kubernetes without becoming a full DevOps engineer.',
    coverImage: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=420&fit=crop&auto=format',
    authorId: 'a4',
    categoryId: 'c3',
    tags: ['Kubernetes', 'DevOps', 'Python', 'ML'],
    publishedAt: '2026-07-05T09:00:00Z',
    readingTime: 14,
    likes: 298,
    views: 9800,
    isFeatured: false,
    isTrending: false,
    content: [],
    toc: [],
  },
  {
    id: '8',
    slug: 'neural-network-from-scratch',
    title: 'Building Your First Neural Network from Scratch in Python',
    excerpt: 'No PyTorch, no TensorFlow — just NumPy and first principles. Understanding backpropagation by implementing it yourself is the highest-leverage thing a new ML engineer can do.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=420&fit=crop&auto=format',
    authorId: 'a4',
    categoryId: 'c4',
    tags: ['Neural Networks', 'Python', 'Deep Learning'],
    publishedAt: '2026-07-01T09:00:00Z',
    readingTime: 18,
    likes: 756,
    views: 28400,
    isFeatured: false,
    isTrending: false,
    content: [],
    toc: [],
  },
  {
    id: '9',
    slug: 'designing-developer-tools',
    title: "Designing Developer Tools That Don't Suck",
    excerpt: 'Discoverability, progressive disclosure, error messages that help instead of blame, and the other craft principles that separate beloved dev tools from merely functional ones.',
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=420&fit=crop&auto=format',
    authorId: 'a2',
    categoryId: 'c3',
    tags: ['Developer Experience', 'Design', 'Open Source'],
    publishedAt: '2026-06-28T09:00:00Z',
    readingTime: 7,
    likes: 544,
    views: 17900,
    isFeatured: false,
    isTrending: false,
    content: [],
    toc: [],
  },
  {
    id: '10',
    slug: 'ai-transforming-scientific-research',
    title: 'The Quiet Revolution: How AI is Transforming Scientific Research',
    excerpt: 'From protein folding to drug discovery to climate modeling, AI is accelerating the scientific method in ways that will compound over decades. A deep dive into what\'s already happened.',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=420&fit=crop&auto=format',
    authorId: 'a1',
    categoryId: 'c1',
    tags: ['AI', 'Science', 'Research'],
    publishedAt: '2026-06-22T09:00:00Z',
    readingTime: 11,
    likes: 681,
    views: 22100,
    isFeatured: false,
    isTrending: false,
    content: [],
    toc: [],
  },
  {
    id: '11',
    slug: 'creativity-code-technical-writing',
    title: 'On Creativity, Code, and Finding Your Voice as a Technical Writer',
    excerpt: "Technical writing doesn't have to be dry. The best technical content teaches and moves simultaneously. Here's how I think about bringing craft to technical communication.",
    coverImage: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&h=420&fit=crop&auto=format',
    authorId: 'a3',
    categoryId: 'c5',
    tags: ['Writing', 'Career', 'Personal'],
    publishedAt: '2026-06-18T09:00:00Z',
    readingTime: 8,
    likes: 829,
    views: 27600,
    isFeatured: false,
    isTrending: false,
    content: [],
    toc: [],
  },
  {
    id: '12',
    slug: 'fine-tuning-llms-production',
    title: 'Fine-Tuning LLMs for Production: What Nobody Tells You',
    excerpt: 'Dataset curation is 80% of the work. Here are the hard-won lessons from shipping fine-tuned models at scale — covering data pipelines, evaluation, and the common traps that waste months.',
    coverImage: 'https://images.unsplash.com/photo-1594377157309-25fdd48dae4b?w=800&h=420&fit=crop&auto=format',
    authorId: 'a4',
    categoryId: 'c4',
    tags: ['Fine-tuning', 'LLMs', 'Python', 'ML'],
    publishedAt: '2026-06-14T09:00:00Z',
    readingTime: 13,
    likes: 493,
    views: 16700,
    isFeatured: false,
    isTrending: true,
    content: [],
    toc: [],
  },
];

export const comments = [
  {
    id: 'cm1',
    authorName: 'Jordan Park',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format',
    content: 'Excellent piece. The point about evaluation infrastructure being the real moat is something I wish I had internalized earlier. We spent months building features before we had solid evals, and it cost us dearly.',
    publishedAt: '2026-07-28T14:32:00Z',
    likes: 47,
  },
  {
    id: 'cm2',
    authorName: 'Leila Nasser',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format',
    content: "I appreciate the section on hard problems. Too much AI coverage right now reads like pure hype. The honest acknowledgment that hallucination and causal reasoning remain unsolved is refreshing and important.",
    publishedAt: '2026-07-28T16:15:00Z',
    likes: 31,
  },
  {
    id: 'cm3',
    authorName: 'Tomás Herrera',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format',
    content: "The code snippet showing extended thinking with Claude is gold. I've been building a tutoring agent and this pattern of letting the model reason before responding has been transformative for accuracy.",
    publishedAt: '2026-07-29T09:44:00Z',
    likes: 23,
  },
];

export function getAuthor(authorId: string): Author {
  return authors.find(a => a.id === authorId) || authors[0];
}

export function getCategory(categoryId: string): Category {
  return categories.find(c => c.id === categoryId) || categories[0];
}

export function getArticlesByAuthor(authorId: string): Article[] {
  return articles.filter(a => a.authorId === authorId);
}

export function getArticlesByCategory(categoryId: string): Article[] {
  return articles.filter(a => a.categoryId === categoryId);
}

export function getRelatedArticles(article: Article, count = 3): Article[] {
  return articles
    .filter(a => a.id !== article.id && (a.categoryId === article.categoryId || a.tags.some(t => article.tags.includes(t))))
    .slice(0, count);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return String(views);
}
