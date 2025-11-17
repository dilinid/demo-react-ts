/**
 * Utility functions for keyboard shortcut handling
 */

/**
 * Detect if the user is on a Mac
 */
export const isMac =
  typeof navigator !== "undefined" &&
  navigator.platform.toUpperCase().indexOf("MAC") >= 0;

/**
 * Format keyboard shortcut for display based on OS
 * @param keyBinding - The key binding string (e.g., "Alt+T")
 * @returns Formatted string with OS-appropriate symbols
 */
export function formatKeyBinding(keyBinding: string): string {
  if (!keyBinding) return "";

  if (isMac) {
    return keyBinding
      .replace("Alt", "⌥") // Option key symbol
      .replace("Ctrl", "⌘") // Command key symbol
      .replace("Shift", "⇧"); // Shift key symbol
  }

  return keyBinding;
}

/**
 * Parse keyboard event to key combination string
 * @param event - Keyboard event
 * @returns Key combination string (e.g., "alt+t")
 */
export function parseKeyEvent(event: KeyboardEvent): string {
  const keys: string[] = [];

  if (event.altKey) keys.push("alt");
  if (event.ctrlKey) keys.push("ctrl");
  if (event.shiftKey) keys.push("shift");

  if (event.key && event.key.length === 1) {
    keys.push(event.key.toLowerCase());
  }

  return keys.join("+");
}
