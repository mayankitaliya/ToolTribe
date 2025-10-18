import { ThemedText } from "@/components/themed-text";
import { FlatList, View } from "react-native";

const List = () => {
  const items = [
    { id: 1, name: "Item 1", description: "Description 1" },
    { id: 2, name: "Item 2", description: "Description 2" },
    { id: 3, name: "Item 3", description: "Description 3" },
  ];

  return (
    <>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1 }}>
            <ThemedText>{item.name}</ThemedText>
            <ThemedText>{item.description}</ThemedText>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default List;
