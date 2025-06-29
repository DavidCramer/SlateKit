import React, { createContext, useContext, useRef } from "react";

type EventHandler = (...args: any[]) => void;

type EventBus = {
  emit: (event: string, ...args: any[]) => void;
  on: (event: string, handler: EventHandler) => void;
  off: (event: string, handler: EventHandler) => void;
};

const EventContext = createContext<EventBus | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const subscribers = useRef<Record<string, Set<EventHandler>>>({});

  const emit: EventBus["emit"] = (event, ...args) => {
    subscribers.current[event]?.forEach((handler) => handler(...args));
  };

  const on: EventBus["on"] = (event, handler) => {
    if (!subscribers.current[event]) {
      subscribers.current[event] = new Set();
    }
    subscribers.current[event].add(handler);
  };

  const off: EventBus["off"] = (event, handler) => {
    subscribers.current[event]?.delete(handler);
  };

  return (
    <EventContext.Provider value={{ emit, on, off }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventBus = (): EventBus => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEventBus must be used within an EventProvider");
  return context;
};
