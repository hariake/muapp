import { View, Text,FlatList,} from 'react-native'
import React, { useEffect, } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import Searchinput from '../../../components/SearchInput'
import { getAllPosts } from '../../lib/appwrite'
import VideoCard from '../../../components/VideoCard'
import { useLocalSearchParams} from 'expo-router'

const Search = () => {
    const { query } = useLocalSearchParams;
    const { data: posts, refetch } = useAppwrite(
      () => searchPosts(query));

    useEffect(() => {
      refetch()
    }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
      data={[{ id:1 }, { id:2 }, { id:3 },]}
      keyExtractor={(item) => item.$id}
      renderItem={( { item } ) => {
        <VideoCard video={item}/>
      }}
      ListHeaderComponent={() => (
        <View className="my-6 px-4">
                    <Text className="font-pmedium text-sm text-gray-100">
                        Search results
                    </Text> 
                    <Text className="text-2xl font-psemibold text-white">
                      {query}
                    </Text>

                    <View className="mt-6 mb-6">
                    <SearchInput initialQuery={query} />
                    </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
        title="No videos found"
        subtitle= "No videos found for this search query"
        />
      )}
      />
    </SafeAreaView>
  )
}

export default Search