"use client";

import { useUIState, useAIState, useActions } from "ai/rsc";
import type { AIState, ClientMessage } from "@/app/ai";
import { CurrentWeatherCardProps } from "./current-weather-card";

type WeatherButtonProps = {
  onClick: () => void;
  label: string;
};

function WeatherButton({ onClick, label }: WeatherButtonProps) {
  return (
    <button
      className="flex w-fit flex-row items-center gap-2 rounded-xl border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-600 ring-slate-950/20 hover:bg-zinc-100 focus:outline-none focus-visible:ring-[3px] dark:ring-white/40"
      onClick={onClick}
    >
      <svg
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="14"
        fill="currentcolor"
      >
        <path
          d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z"
          fill="currentColor"
        ></path>
        <path
          d="M14.5 4.5V5H13.5V4.5C13.5 3.94772 13.0523 3.5 12.5 3.5H12V3V2.5H12.5C13.0523 2.5 13.5 2.05228 13.5 1.5V1H14H14.5V1.5C14.5 2.05228 14.9477 2.5 15.5 2.5H16V3V3.5H15.5C14.9477 3.5 14.5 3.94772 14.5 4.5Z"
          fill="currentColor"
        ></path>
        <path
          d="M8.40706 4.92939L8.5 4H9.5L9.59294 4.92939C9.82973 7.29734 11.7027 9.17027 14.0706 9.40706L15 9.5V10.5L14.0706 10.5929C11.7027 10.8297 9.82973 12.7027 9.59294 15.0706L9.5 16H8.5L8.40706 15.0706C8.17027 12.7027 6.29734 10.8297 3.92939 10.5929L3 10.5V9.5L3.92939 9.40706C6.29734 9.17027 8.17027 7.29734 8.40706 4.92939Z"
          fill="currentColor"
        ></path>
      </svg>
      {label}
    </button>
  );
}

export default function CurrentWeatherButtons({
  currentWeather,
}: {
  currentWeather: CurrentWeatherCardProps;
}) {
  const [, setMessages] = useUIState();
  const [, setAIState] = useAIState();
  const { getWeatherForecastUI, getCurrentWeatherUI } = useActions();

  const handleGetWeatherForecast = async (
    location: string,
    forecastDays: number,
    countryCode?: string,
    units?: "metric" | "imperial",
  ) => {
    setAIState((prevState: AIState) => ({
      ...prevState,
      isFinished: false,
    }));
    const response = await getWeatherForecastUI(
      location,
      forecastDays,
      countryCode,
      units,
    );
    setMessages((prevMessages: ClientMessage[]) => [...prevMessages, response]);
  };

  const handleGetCurrentWeather = async (
    location: string,
    countryCode?: string,
    units?: "metric" | "imperial",
  ) => {
    setAIState((prevState: AIState) => ({
      ...prevState,
      isFinished: false,
    }));
    const response = await getCurrentWeatherUI(location, countryCode, units);
    setMessages((prevMessages: ClientMessage[]) => [...prevMessages, response]);
  };

  return (
    <div className="flex flex-row flex-wrap items-center gap-2">
      <WeatherButton
        onClick={() =>
          handleGetWeatherForecast(
            currentWeather.location,
            3,
            currentWeather.countryCode ?? undefined,
            currentWeather.units ?? undefined,
          )
        }
        label="3 day forecast"
      />
      <WeatherButton
        onClick={() =>
          handleGetWeatherForecast(
            currentWeather.location,
            5,
            currentWeather.countryCode ?? undefined,
            currentWeather.units ?? undefined,
          )
        }
        label="5 day forecast"
      />
      <WeatherButton
        onClick={() =>
          handleGetCurrentWeather(
            currentWeather.location === "New York" ? "London" : "New York",
            currentWeather.countryCode === "US" ? "GB" : "US",
            currentWeather.units ?? undefined,
          )
        }
        label={`Weather in ${
          currentWeather.location === "New York" ? "London" : "New York"
        }`}
      />
    </div>
  );
}
