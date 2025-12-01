import { useColor } from "@/theme/hooks/useColor";
import { ExternalPathString, Link, RelativePathString } from "expo-router";
import { Pressable, View } from "react-native";

export function ListButton({
  onPress,
  link,
  children,
  color,
}: {
  onPress?: () => void;
  link?:
    | RelativePathString
    | ExternalPathString
    | "/_sitemap"
    | `/_sitemap?${string}`;
  children?: React.ReactNode;
  color?: string;
}) {
  const { background, textButton: textColor, shadow } = useColor();
  const backgroundColor = color ? color : background;
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            boxShadow: pressed
              ? `1px 1px 1px ${shadow}`
              : `2px 4px 4px ${shadow}`,
          },
          { opacity: pressed ? 0.8 : 1 },
          {
            padding: 8,
            borderRadius: 20,
            backgroundColor: backgroundColor,
          },
        ]}
        onPress={() => {
          onPress?.();
        }}
      >
        {link && <Link href={link}></Link>}
        {children}
      </Pressable>
    </View>
  );
}
