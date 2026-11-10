"use client";

// The demo store for React screens. One store per tab, made on first use.
// The server (and the first paint) sees the sample board; the visitor's own
// changes from local storage arrive right after.

import { useSyncExternalStore } from "react";
import { createStore, type DemoState, type DemoStore, type KeyValueStorage } from "./store";

let store: DemoStore | undefined;
let serverState: DemoState | undefined;

function memoryStorage(): KeyValueStorage {
  const data = new Map<string, string>();
  return { getItem: (k) => data.get(k) ?? null, setItem: (k, v) => void data.set(k, v), removeItem: (k) => void data.delete(k) };
}

function browserStorage(): KeyValueStorage {
  try {
    // Reading localStorage itself throws in some framed or private browsers.
    const s = window.localStorage;
    s.getItem("probe");
    return s;
  } catch {
    return memoryStorage();
  }
}

export function demoStore(): DemoStore {
  if (!store) store = createStore(typeof window === "undefined" ? memoryStorage() : browserStorage());
  return store;
}

function getServerState(): DemoState {
  if (!serverState) serverState = createStore(memoryStorage()).getState();
  return serverState;
}

export function useDemoState(): DemoState {
  return useSyncExternalStore(
    (listener) => demoStore().subscribe(listener),
    () => demoStore().getState(),
    getServerState,
  );
}
