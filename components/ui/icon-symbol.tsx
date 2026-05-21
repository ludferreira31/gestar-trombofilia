import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  // Navigation
  "house.fill": "home",
  "calendar": "calendar-today",
  "person.fill": "person",
  "heart.fill": "favorite",
  "book.fill": "menu-book",
  "bubble.left.fill": "chat-bubble",
  // Actions
  "paperplane.fill": "send",
  "plus": "add",
  "pencil": "edit",
  "trash": "delete",
  "bell.fill": "notifications",
  "gear": "settings",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "chevron.down": "expand-more",
  "xmark": "close",
  "checkmark": "check",
  "lock.fill": "lock",
  "star.fill": "star",
  "magnifyingglass": "search",
  // Health
  "cross.fill": "local-hospital",
  "pill.fill": "medication",
  "waveform.path.ecg": "monitor-heart",
  "doc.text.fill": "description",
  "folder.fill": "folder",
  "camera.fill": "camera-alt",
  "photo.fill": "photo",
  "arrow.up.doc.fill": "upload-file",
  // Community
  "person.3.fill": "group",
  "hand.raised.fill": "pan-tool",
  "megaphone.fill": "campaign",
  // Misc
  "info.circle.fill": "info",
  "questionmark.circle.fill": "help",
  "arrow.right": "arrow-forward",
  "arrow.left": "arrow-back",
  "clock.fill": "access-time",
  "map.fill": "map",
  "flag.fill": "flag",
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
