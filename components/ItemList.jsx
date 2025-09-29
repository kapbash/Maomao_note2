//ItemList.jsx
import { StyleSheet, Text, View, TouchableOpacity, FlatList, LayoutAnimation, Platform, UIManager } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ItemList = ({ 
  items,
  selectedCategory,
  expandedIndex, 
  setExpandedIndex, 
  onEditItem, 
  onDeleteItem,
  selectedTag 
}) => {
  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!selectedCategory) {
    return <Text>Select a category to view items.</Text>
  }

  // 🔑 Filter items based on selectedTag
  const filteredItems = selectedTag
    ? items.filter(item => item.tags?.includes(selectedTag))
    : items;

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.categoryTitle}>
          {selectedCategory?.name} {selectedTag && `(${selectedTag})`}
        </Text>
        <Text style={styles.itemCount}>
          {filteredItems.length}つ
        </Text>
      </View>

      {filteredItems.length === 0 ? (
        <Text>No items</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item, idx) => item.id || idx.toString()}
          renderItem={({ item, index }) => {
            const expanded = expandedIndex === index;
            return (
              <TouchableOpacity
                onPress={() => toggleExpand(index)}
                activeOpacity={0.8}
              >
                <View style={styles.itemBox}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  {expanded && (
                    <View style={styles.itemDetails}>
                      {item.tags && item.tags.length > 0 && (
                        <View style={styles.tagsContainer}>
                          <Text style={styles.tagsLabel}>Tags:</Text>
                          <View style={styles.tagsWrapper}>
                            {item.tags.map((tag, tagIndex) => (
                              <View key={tagIndex} style={styles.tagChip}>
                                <Text style={styles.tagText}>{tag}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      )}
                      <Text style={styles.itemDescription}>{item.description}</Text>

                      {/* Item actions */}
                      <View style={styles.itemActions}>
                        <TouchableOpacity onPress={() => onEditItem(item, index)} style={styles.editBtn}>
                          <Ionicons name="create-outline" size={18} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onDeleteItem(index)} style={styles.deleteBtn}>
                          <Ionicons name="trash-outline" size={18} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </>
  )
}

export default ItemList

const styles = StyleSheet.create({
sectionHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 25,   // bigger than before
    fontWeight: "bold",
    color: "#333",
  },
  itemCount: {
    fontSize: 16,
    color: "#666",
  },
  itemBox: { 
    backgroundColor: "#f0f0f0", 
    padding: 10, 
    marginVertical: 6, 
    borderRadius: 6 
  },
  itemName: { 
    fontWeight: "bold", 
    fontSize: 16, 
    padding: 3 
  },
  tagsContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  tagsLabel: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
    marginBottom: 4,
  },
  tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  tagChip: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2196F3",
  },
  tagText: {
    fontSize: 11,
    color: "#1976d2",
    fontWeight: "500",
  },
  itemDescription: { 
    fontSize: 14, 
    marginTop: 4 
  },
  itemDetails: { 
    marginTop: 6 
  },
  itemActions: { 
    flexDirection: "row", 
    marginTop: 8, 
    gap: 5,
    alignSelf: "flex-end",

  },
  editBtn: { 
    backgroundColor: "#4a90e2", 
    padding: 6, 
    borderRadius: 6 
  },
  deleteBtn: { 
    backgroundColor: "#e74c3c", 
    padding: 6, 
    borderRadius: 6 
  },
})