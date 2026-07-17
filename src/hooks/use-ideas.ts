import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Idea, LeanCanvas, ValidationReport, ChatMessage } from "@/types/idea";

// Helper to load/save ideas in localStorage
const getStoredIdeas = (): Idea[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("sparkboard_ideas");
  if (!stored) {
    // Populate with 2 initial high-quality mock ideas
    const initialIdeas: Idea[] = [
      {
        id: "1",
        title: "TerraGrow IoT",
        oneLiner: "Automated indoor vertical farming system using computer vision.",
        description: "An automated hydroponic vertical growing shelf for urban apartments, using micro-sensors and computer vision to monitor crop health, manage nutrients, and optimize LED lighting schedules automatically.",
        industry: "AgTech / IoT",
        tags: ["IoT", "Sustainability", "Hardware"],
        status: "validated",
        isPublic: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        leanCanvas: {
          problem: [
            "Urban residents lack space and light to grow their own organic produce.",
            "Hydroponic setups are historically too complex for non-hobbyists to configure.",
            "Water waste in traditional farming is extremely high."
          ],
          solution: [
            "Compact, multi-tier vertical shelf fitting standard apartment corners.",
            "Computer vision camera scans leaves and auto-injects perfect pH nutrients.",
            "Closed-loop water recycling reduces waste by 95%."
          ],
          keyMetrics: ["Monthly Active Users on Companion App", "Crop Yield per Square Foot", "Unit Production Cost"],
          valueProposition: [
            "Fresh, organic leafy greens and herbs grown in your living room with zero effort.",
            "Smart AI gardening mentor running completely in the background."
          ],
          unfairAdvantage: [
            "Proprietary low-cost nutrient dosing valve system.",
            "Pre-trained computer vision model for early pest/disease detection."
          ],
          channels: ["Direct-to-consumer Shopify store", "Design/Home decor blogs", "Kickstarter pre-launch campaign"],
          customerSegments: ["Health-conscious urbanites", "Tech professionals", "Apartment dwellers looking for sustainable lifestyles"],
          costStructure: ["Hardware manufacturing & assembly (Shenzhen)", "Sensor calibration software engineering", "Shipping and package materials"],
          revenueStreams: ["Hardware unit sale ($399)", "Monthly seed & nutrient capsule subscription ($19/mo)"]
        },
        validationReport: {
          ideaId: "1",
          feasibility: {
            technical: 78,
            marketSize: 65,
            financialViability: 82,
            overallScore: 75
          },
          swot: {
            strengths: ["High subscription retention via nutrient pods", "Highly visual product suitable for viral marketing", "Eco-friendly positioning"],
            weaknesses: ["High initial manufacturing capital requirements", "Steep learning curve for hardware assembly support", "Limited harvest variety initially"],
            opportunities: ["Partnerships with luxury real estate developers for pre-installed units", "Corporate wellness office installations", "Expansion into medicinal herbs"],
            threats: ["Fluctuations in international hardware component supply chains", "Copycats on Amazon at lower price points", "Unfavorable energy costs raising indoor growing bills"]
          },
          competitors: [
            {
              name: "Click & Grow",
              description: "Simple smart soil herb garden pods, small footprint but limited automated growth analysis.",
              differentiation: "TerraGrow uses vertical multi-tier shelving and computer vision feedback for active nutrient leveling."
            },
            {
              name: "Rise Gardens",
              description: "Large luxury indoor hydroponic cabinets connected to an app, manual nutrient adjustment.",
              differentiation: "TerraGrow uses automated pH/nutrient dosing valves, eliminating manual water testing."
            }
          ],
          summaryReport: "TerraGrow IoT possesses a very robust hardware-to-subscription financial structure. Technical feasibility remains the largest bottleneck due to sensor calibrating and valve reliability in damp environments. We recommend securing pre-sales on Kickstarter to fund the initial molding and batch fabrication run.",
          generatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        chatHistory: [
          {
            id: "msg_1",
            role: "user",
            content: "Should I focus on leafy greens first, or try to support strawberries?",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 30 * 60 * 1000).toISOString()
          },
          {
            id: "msg_2",
            role: "model",
            content: "Start strictly with leafy greens (lettuce, spinach, basil). They grow rapidly (30-day harvest cycle), require simple nutrient profiles, and tolerate varied lighting. Strawberries require high light intensity, active pollination support, and longer fruiting cycles, which complicates the user onboarding experience. Perfect the greens first, then introduce strawberry upgrade pods.",
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 29 * 60 * 1000).toISOString()
          }
        ]
      },
      {
        id: "2",
        title: "CleanSlate API",
        oneLiner: "Automated user data deletion compliance api for GDPR and CCPA.",
        description: "A developer API that integrates with SaaS databases to instantly trigger, track, and verify absolute deletion of user records across databases, CRM platforms, analytics systems, and third-party logs on GDPR/CCPA requests.",
        industry: "SaaS / Compliance",
        tags: ["API", "Privacy", "SaaS", "B2B"],
        status: "draft",
        isPublic: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    localStorage.setItem("sparkboard_ideas", JSON.stringify(initialIdeas));
    return initialIdeas;
  }
  return JSON.parse(stored);
};

const saveStoredIdeas = (ideas: Idea[]) => {
  localStorage.setItem("sparkboard_ideas", JSON.stringify(ideas));
};

// Fetch all ideas
export function useIdeas(filters?: { search?: string; tag?: string }) {
  return useQuery<Idea[]>({
    queryKey: ["ideas", filters],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      let list = getStoredIdeas();
      
      if (filters?.search) {
        const query = filters.search.toLowerCase();
        list = list.filter(
          (idea) =>
            idea.title.toLowerCase().includes(query) ||
            idea.oneLiner.toLowerCase().includes(query) ||
            idea.description.toLowerCase().includes(query)
        );
      }

      if (filters?.tag) {
        list = list.filter((idea) => idea.tags.includes(filters.tag!));
      }

      return list;
    },
  });
}

// Fetch single idea
export function useIdea(id: string) {
  return useQuery<Idea>({
    queryKey: ["ideas", id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 250));
      const list = getStoredIdeas();
      const item = list.find((idea) => idea.id === id);
      if (!item) throw new Error("Idea not found");
      return item;
    },
    enabled: !!id,
  });
}

// Create new draft idea
export function useCreateIdea() {
  const queryClient = useQueryClient();
  return useMutation<Idea, Error, Partial<Idea>>({
    mutationFn: async (payload) => {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const list = getStoredIdeas();
      const newId = (list.length + 1).toString();
      
      const newIdea: Idea = {
        id: newId,
        title: payload.title || "Untitled Idea",
        oneLiner: payload.oneLiner || "A short description of your startup idea.",
        description: payload.description || "",
        industry: payload.industry || "General",
        tags: payload.tags || [],
        status: "draft",
        isPublic: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      list.unshift(newIdea);
      saveStoredIdeas(list);
      return newIdea;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
}

// Update existing idea details (saving manual edits)
export function useUpdateIdea() {
  const queryClient = useQueryClient();
  return useMutation<Idea, Error, { id: string; payload: Partial<Idea> }>({
    mutationFn: async ({ id, payload }) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const list = getStoredIdeas();
      const index = list.findIndex((item) => item.id === id);
      if (index === -1) throw new Error("Idea not found");

      const updatedIdea: Idea = {
        ...list[index],
        ...payload,
        updatedAt: new Date().toISOString(),
      };

      list[index] = updatedIdea;
      saveStoredIdeas(list);
      return updatedIdea;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      queryClient.invalidateQueries({ queryKey: ["ideas", data.id] });
    },
  });
}

// Delete an idea
export function useDeleteIdea() {
  const queryClient = useQueryClient();
  return useMutation<string, Error, string>({
    mutationFn: async (id) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const list = getStoredIdeas();
      const filtered = list.filter((item) => item.id !== id);
      saveStoredIdeas(filtered);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });
}

// AI: Improve Lean Canvas using Gemini Simulation
export function useImproveIdea() {
  const queryClient = useQueryClient();
  return useMutation<Idea, Error, string>({
    mutationFn: async (id) => {
      // Simulate Gemini API response delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const list = getStoredIdeas();
      const index = list.findIndex((item) => item.id === id);
      if (index === -1) throw new Error("Idea not found");

      const idea = list[index];

      // Smart mock canvas mapping based on keywords in title & description
      const mockCanvas: LeanCanvas = {
        problem: [
          `Customers struggle with key bottlenecks in the ${idea.industry || "industry"} sector.`,
          "Existing alternative approaches are manual, expensive, and error-prone.",
          "Lack of specialized, integration-ready tools forces complex workflows."
        ],
        solution: [
          `A streamlined, automated platform to handle: ${idea.oneLiner}.`,
          "Direct integration modules with popular workspace platforms.",
          "Real-time visual diagnostic logs and dashboard tracking."
        ],
        keyMetrics: ["Active Workspace Integrations", "Task Processing Duration (sec)", "Customer Acquisition Cost"],
        valueProposition: [
          `Save up to 40 hours of manual operational work in ${idea.title}.`,
          "Simple, flat pricing with zero implementation overhead."
        ],
        unfairAdvantage: [
          "Proprietary pre-built templates and quick connectors.",
          "Built-in compliance monitoring alerts and automatic auditing."
        ],
        channels: ["Product Hunt pre-launch", "Developer-focused community boards (HN/Reddit)", "Google Search SEO keywords"],
        customerSegments: ["Indie developers & bootstrapped startups", "Tech-forward small-to-medium businesses", "DevOps operations teams"],
        costStructure: ["Cloud runtime infrastructure (Vercel/AWS)", "AI token usage billing", "Ongoing software support and developer hours"],
        revenueStreams: ["Developer Seat Subscription ($19/mo)", "Usage-based tier packages", "Enterprise custom setups"]
      };

      const updatedIdea: Idea = {
        ...idea,
        status: "improving",
        leanCanvas: mockCanvas,
        updatedAt: new Date().toISOString(),
      };

      list[index] = updatedIdea;
      saveStoredIdeas(list);
      return updatedIdea;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      queryClient.invalidateQueries({ queryKey: ["ideas", data.id] });
    },
  });
}

// AI: Run Feasibility and SWOT analysis using Gemini Simulation
export function useValidateIdea() {
  const queryClient = useQueryClient();
  return useMutation<Idea, Error, string>({
    mutationFn: async (id) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const list = getStoredIdeas();
      const index = list.findIndex((item) => item.id === id);
      if (index === -1) throw new Error("Idea not found");

      const idea = list[index];
      
      // Calculate scores dynamically based on length of description as proxy for effort
      const baseScore = Math.min(65 + (idea.description?.length || 0) % 25, 95);
      const scores = {
        technical: Math.round(baseScore - 5 + Math.random() * 10),
        marketSize: Math.round(baseScore - 10 + Math.random() * 10),
        financialViability: Math.round(baseScore - 2 + Math.random() * 5),
        overallScore: Math.round(baseScore)
      };

      const mockReport: ValidationReport = {
        ideaId: id,
        feasibility: scores,
        swot: {
          strengths: [
            `Strong domain positioning in ${idea.industry || "general market"}.`,
            "SaaS-ready architecture allows recurring subscription streams.",
            "Solves an acute developer or business operations pain point."
          ],
          weaknesses: [
            "Highly dependent on third-party API configurations.",
            "Initial setup requires developer integration experience.",
            "Low barrier to entry for baseline clones."
          ],
          opportunities: [
            "Expanding into white-labeled enterprise portals.",
            "Building ecosystem plug-ins (Vercel Integration Marketplace, Slack apps).",
            "Integrating advanced automated security monitoring."
          ],
          threats: [
            "Incumbents building basic native tools inside existing systems.",
            "Drastic pricing changes from underlying serverless providers.",
            "Rapidly shifting regulations in user data storage."
          ]
        },
        competitors: [
          {
            name: `${idea.title} Alternative Inc`,
            description: "Established legacy platform offering manual bulk handling.",
            differentiation: `SparkBoard's automated framework for '${idea.title}' operates instantly without setup delays.`
          },
          {
            name: "Vercel Integrations / Open Source Tooling",
            description: "Developer scripts that solve parts of the problem manually.",
            differentiation: "A cohesive UI canvas providing simple dashboard audit histories and instant compliance validation."
          }
        ],
        summaryReport: `### Market Feasibility Summary for ${idea.title}
The idea is highly viable with a feasibility score of **${scores.overallScore}%**. 
The primary value proposition is solid. We recommend focusing on a **Self-Serve Developer Sandbox** as the key conversion funnel. Technical feasibility is high, but market positioning must clearly articulate the time-saved metrics to offset copycats.`,
        generatedAt: new Date().toISOString()
      };

      const updatedIdea: Idea = {
        ...idea,
        status: "validated",
        validationReport: mockReport,
        updatedAt: new Date().toISOString(),
      };

      list[index] = updatedIdea;
      saveStoredIdeas(list);
      return updatedIdea;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      queryClient.invalidateQueries({ queryKey: ["ideas", data.id] });
    },
  });
}

// AI: Chat Conversation with Board Buddy Startup Mentor
export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation<
    Idea,
    Error,
    { id: string; message: string }
  >({
    mutationFn: async ({ id, message }) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const list = getStoredIdeas();
      const index = list.findIndex((item) => item.id === id);
      if (index === -1) throw new Error("Idea not found");

      const idea = list[index];
      const history = idea.chatHistory || [];

      // Add user message
      const userMsg: ChatMessage = {
        id: `msg_u_${Date.now()}`,
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      };

      // Simple keyword routing to make the AI chatbot reply intelligently to questions
      const lowercaseMsg = message.toLowerCase();
      let aiContent = "";

      if (lowercaseMsg.includes("marketing") || lowercaseMsg.includes("market") || lowercaseMsg.includes("customer")) {
        aiContent = `For **${idea.title}**, marketing should prioritize developer advocacy. Post your early architecture write-ups on Hacker News and Dev.to. Offer a generous free tier for side projects, and rely on developer word-of-mouth rather than generic paid ads.`;
      } else if (lowercaseMsg.includes("revenue") || lowercaseMsg.includes("pricing") || lowercaseMsg.includes("money")) {
        aiContent = `Pricing **${idea.title}** should align with usage. A simple tiered seat plan starting at $15/month for basic workspaces, combined with an API usage cap, will capture early indie setups while maintaining clear upgrade triggers for corporate scaling.`;
      } else if (lowercaseMsg.includes("problem") || lowercaseMsg.includes("solution")) {
        aiContent = `Analyzing your solution for: '${idea.oneLiner}'. You need to ensure the onboarding experience requires less than 3 minutes to activate. If devs have to write more than 5 lines of config, the bounce rate will triple.`;
      } else {
        aiContent = `That is an interesting question regarding **${idea.title}**. From a scaling perspective, I recommend looking closely at how this maps to your Canvas problem segments. Make sure you don't over-engineer this in the draft phase. Focus on the core value proposition first.`;
      }

      const modelMsg: ChatMessage = {
        id: `msg_m_${Date.now()}`,
        role: "model",
        content: aiContent,
        timestamp: new Date().toISOString(),
      };

      const updatedIdea: Idea = {
        ...idea,
        chatHistory: [...history, userMsg, modelMsg],
        updatedAt: new Date().toISOString(),
      };

      list[index] = updatedIdea;
      saveStoredIdeas(list);
      return updatedIdea;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ideas", data.id] });
    },
  });
}
