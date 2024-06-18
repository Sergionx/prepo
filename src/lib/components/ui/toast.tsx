"use client";

import { cn } from "@nextui-org/react";
// TODO - Usar cn para las variantes
import * as RadixToast from "@radix-ui/react-toast";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ElementRef,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react";

const ToastContext = createContext<{
  showToast: (message: Omit<Message, "id">) => void;
}>({
  showToast: () => {
    throw new Error(
      "You can't call showToast() outside of a <ToastProvider> – add it to your tree."
    );
  },
});

export function useToast() {
  return useContext(ToastContext);
}

interface Message {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning";
}
export type MessageNoId = Omit<Message, "id">;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  function showToast(message: MessageNoId) {
    setMessages((toasts) => [
      ...toasts,
      {
        id: window.crypto.randomUUID(),
        ...message,
      },
    ]);
  }

  return (
    <RadixToast.Provider>
      <ToastContext.Provider value={{ showToast }}>
        {children}
      </ToastContext.Provider>

      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <Toast
            key={message.id}
            message={message}
            onClose={() =>
              setMessages((toasts) => toasts.filter((t) => t.id !== message.id))
            }
          />
        ))}
      </AnimatePresence>

      <RadixToast.Viewport className="max-sm:top-20 fixed top-4 right-4 flex w-80 flex-col-reverse gap-3 z-50" />
    </RadixToast.Provider>
  );
}

const Toast = forwardRef<
  ElementRef<typeof RadixToast.Root>,
  {
    onClose: () => void;
    message: Message;
  }
>(function Toast({ onClose, message }, forwardedRef) {
  let width = 320;
  let margin = 16;

  const { variant = "default" } = message;

  return (
    <RadixToast.Root
      ref={forwardedRef}
      asChild
      forceMount
      onOpenChange={onClose}
      duration={2500}
    >
      <motion.li
        layout
        initial={{ x: width + margin }}
        animate={{ x: 0 }}
        exit={{
          opacity: 0,
          zIndex: -1,
          transition: {
            opacity: {
              duration: 0.2,
            },
          },
        }}
        transition={{
          type: "spring",
          mass: 1,
          damping: 30,
          stiffness: 200,
        }}
        style={{ width, WebkitTapHighlightColor: "transparent" }}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-lg border shadow-sm backdrop-blur",
            {
              "bg-gray-800 border-gray-600 text-gray-300":
                variant === "default",
              "bg-green-800 border-green-600 text-green-300":
                variant === "success",
              "bg-red-800 border-red-600 text-red-300": variant === "error",
              "bg-yellow-800 border-yellow-600 text-yellow-300":
                variant === "warning",
            }
          )}
        >
          <main className="pr-2 p-4">
            <RadixToast.Title className="font-bold">
              {message.title}
            </RadixToast.Title>

            <RadixToast.Description
              className="hover:line-clamp-none hover:max-h-24
              max-h-[4.5rem] line-clamp-3 transition-height
              text-slate-300/80"
            >
              {message.description}
            </RadixToast.Description>
          </main>

          {/* TODO - Que tome el heigth disponible h-full no funciona */}
          <RadixToast.Close
            className={cn(
              "border-l transition p-4 hover:text-gray-300 active:text-white hover:bg-gray-600/30",
              {
                "border-gray-600/50 text-gray-500": variant === "default",
                "border-green-600/50 text-green-200": variant === "success",
                "border-red-600/50 text-red-200": variant === "error",
                "border-yellow-600/50 text-yellow-200": variant === "warning",
              }
            )}
          >
            <IconX className="h-5 w-5" />
          </RadixToast.Close>
        </div>
      </motion.li>
    </RadixToast.Root>
  );
});
