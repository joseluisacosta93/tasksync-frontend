import TodoList from "@/app/module/home/components/todo-list";
import { useColor } from "@/theme/hooks/useColor";
import { View } from "react-native";

export default function Home() {
  const color = useColor();
  return (
    <View
      style={{
        backgroundColor: color.background,
        flex: 1,
      }}
    >
      <TodoList />
    </View>
  );
}
