import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  RefreshControl,
  FlatList,
  SectionList,
} from 'react-native';

const ListComponents = () => {
  const [Items, setItems] = useState([
    {name: 'Item 1'},
    {name: 'Item 2'},
    {name: 'Item 3'},
    {name: 'Item 4'},
    {name: 'Item 5'},
    {name: 'Item 6'},
    {name: 'Item 7'},
    {name: 'Item 8'},
    {name: 'Item 9'},
  ]);

  const [Data, setData] = useState([
    {
      title: 'Title 1',
      data: ['Item 1-1', 'Item 1-2', 'Item 1-3', 'Item 1-4'],
    },
    {
      title: 'Title 2',
      data: ['Item 2-1', 'Item 2-2', 'Item 2-3'],
    },
    {
      title: 'Title 3',
      data: ['Item 3-1'],
    },
    {
      title: 'Title 4',
      data: ['Item 4-1', 'Item 4-2'],
    },
  ]);

  const [Refreshing, setRefreshing] = useState(false);

  const onRefreshFlatList = () => {
    setRefreshing(true);
    setItems([...Items, {name: 'Item 66'}]);
    setRefreshing(false);
  };

  const onRefreshSectionList = () => {
    setRefreshing(true);
    const nextNum = (Data.length + 1).toString();
    setData([
      ...Data,
      {
        title: 'Title ' + nextNum,
        data: [`item ${nextNum}-1`, `item ${nextNum}-2`],
      },
    ]);
    setRefreshing(false);
  };

  return (
    <SectionList
      refreshControl={
        <RefreshControl
          refreshing={Refreshing}
          onRefresh={onRefreshSectionList}
          colors={['#ff0']}
        />
      }
      keyExtractor={(item, index) => index.toString()}
      sections={Data}
      renderItem={({item}) => <Text style={styles.text}>{item}</Text>}
      renderSectionHeader={({section}) => (
        <View style={styles.item}>
          <Text style={styles.text}>{section.title}</Text>
        </View>
      )}></SectionList>
    // <FlatList
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={Refreshing}
    //       onRefresh={onRefresh}
    //       colors={['#ff00ff']}
    //     />
    //   }
    //   keyExtractor={(item, index) => index.toString()}
    //   data={Items}
    //   renderItem={({item}) => (
    //     <View style={styles.item}>
    //       <Text style={styles.text}>{item.name}</Text>
    //     </View>
    //   )}></FlatList>
    // <ScrollView
    //   style={styles.body}
    //   refreshControl={
    //     <RefreshControl
    //       refreshing={Refreshing}
    //       onRefresh={onRefresh}
    //       colors={['#ff00ff']}
    //     />
    //   }
    //   {Items.map(object => {
    //     return (
    //       <View style={styles.item} key={object.key}>
    //         <Text style={styles.text}>{object.name}</Text>
    //       </View>
    //     );
    //   })}
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  item: {
    margin: 10,
    backgroundColor: '#4ae1fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 45,
    fontStyle: 'italic',
    margin: 10,
  },
});

export default ListComponents;
