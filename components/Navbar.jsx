import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { usePathname } from 'expo-router'

const Navbar = () => {
  const pathname = usePathname()
  
  const isOnDashboard = pathname === '/'
  const isOnNotes = pathname === '/notes'
  
  const getTitle = () => {
    if (isOnDashboard) return "Dashboard"
    if (isOnNotes) return <TouchableOpacity onPress={handleNotesPress} style={styles.notesButton}>
          <Ionicons name="document-text-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
    return "Maomao Notes"
  }

  const handleDashboardPress = () => {
    router.push('/')
  }

  const handleNotesPress = () => {
    router.push('/notes')
  }

  return (
    <View style={styles.navbar}>
      {!isOnDashboard && (
        <TouchableOpacity onPress={handleDashboardPress} style={styles.dashboardButton}>
          <Ionicons name="grid-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      )}
      
      <Text style={styles.title}>{getTitle()}</Text>
      
      {!isOnNotes && (
        <TouchableOpacity onPress={handleNotesPress} style={styles.notesButton}>
          <Ionicons name="document-text-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    backgroundColor: "#fff",
    elevation: 4,
  },
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#222" 
  },
  dashboardButton: {
    padding: 4,
  },
  notesButton: {
    padding: 4,
  },
})
