import { CoreMessage } from "ai";
import { createAI } from "ai/rsc";
import {
  continueConversation,
  createExampleMessages,
  getWeatherForecastUI,
  getCurrentWeatherUI,
} from "@/server/actions";
import { CountryCode } from "@/libs/schema";
import { PutBlobResult } from "@vercel/blob";

export type AIState = {
  currentModelVariable: string;
  location: {
    isLoaded: boolean;
    locationName?: string;
    countryCode?: CountryCode;
    coordinates: {
      latitude: number;
      longitude: number;
    } | null;
  };
  isFinished: boolean;
  messages: CoreMessage[];
};

export type ClientMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content?: React.ReactNode;
  display?: React.ReactNode;
  spinner?: React.ReactNode;
  file?: PutBlobResult;
};

export type UIState = ClientMessage[];

// Create the AI provider with the initial states and allowed actions
export const AI = createAI<AIState, UIState>({
  actions: {
    continueConversation,
    createExampleMessages,
    getWeatherForecastUI,
    getCurrentWeatherUI,
  },
  initialAIState: {
    currentModelVariable: "gemini-1.5-pro-latest ",
    isFinished: true,
    messages: [],
    location: {
      coordinates: null,
      isLoaded: false,
    },
  } as AIState,
  initialUIState: [] as UIState,
});
