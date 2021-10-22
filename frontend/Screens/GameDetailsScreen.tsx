import React, { useEffect, useState } from 'react';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  SafeAreaView,
  Text,
} from 'react-native';
import ParallaxScroll from '../Components/ParallaxScroll';
import GameService from '../Services/GameService';
import Spacer from '../Components/Spacer';

const renderParallaxHeader = (item) => {
  return <Image
    source={{ uri: item.cover.url }}
    style={styles.imageStyle}
    resizeMode="cover"
  />
};

const renderStickyHeader = (value, item) => {
  console.log(item);
  const opacity = value.interpolate({
    inputRange: [0, 150, 200],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.stickyHeader}>
      <Animated.View style={[styles.stickyHeaderBackground, { opacity }]} />
      <Text style={styles.fixedHeader}>{item.name}</Text>
    </View>
  );
};

const Screenshots = (item) => (
  <>
    <FlatList
      // horizontal
      numColumns={3}
      data={item.screenshots}
      listKey={(game) => game.url}
      keyExtractor={ (item, index) => index.toString() }
      renderItem={(item) => (
        <Image
          style={{ width: 125, height: 125, margin: 5 }}
          source={{ uri: `http:${item.url}` }}
        />
      )}
    />
  </>
);

const windowWidth = Dimensions.get('window').width;

const setDetailsParams = (id) => `fields id, name, summary, genres.name, rating,  total_rating, screenshots.url, first_release_date, cover.url, game_modes.name, cover.image_id, genres.name, platforms.name; where id = ${id};`;

const GameDetailScreen = ({ route }) => {
  const [gameDetails, setGameDetails] = useState([]);
  const [expanded, setExpanded] = useState(true);

  const { id } = route.params;
  const detailsParams = setDetailsParams(id);

  useEffect(() => {
    gameDetailsHandler();
  }, []);

  const gameDetailsHandler = async () => {
    const res = await GameService.getGameDetails(detailsParams);
    if (res) setGameDetails(res);
  };

  return (
    <>
      <FlatList
        horizontal
        data={gameDetails}
        keyExtractor={(game) => game.id.toString()}
        renderItem={({ item }) => (
          <SafeAreaView style={{ flex: 1, backgroundColor: '#555c63' }}>
            <ParallaxScroll
              style={{ flex: 1 }}
              parallaxHeaderHeight={500}
              stickyHeaderHeight={500}
              parallaxHeader={() => renderParallaxHeader(item)}
              stickyHeader={(value: number) => renderStickyHeader(value, item)}
            >

              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  width: windowWidth,
                }}
              >
                <Collapse
                  isExpanded
                  onToggle={() => setExpanded(!expanded)}
                >
                  <CollapseHeader>
                  <Spacer />
                    <Text style={styles.headerText}>Summary</Text>
                  </CollapseHeader>
                  <CollapseBody>
                    <Text style={styles.summary}>{item.summary}</Text>
                    <Spacer />
                  </CollapseBody>
                </Collapse>

                <Collapse
                  isExpanded
                  onToggle={() => setExpanded(!expanded)}
                >
                  <CollapseHeader>
                    <Text style={styles.headerText}>
                      Release Date & Rating
                    </Text>
                  </CollapseHeader>
                  <CollapseBody style={{ flexDirection: 'column' }}>
                    <Text style={styles.content}>
                      {`Released ${new Date(
                        item.first_release_date * 1000,
                        ).toDateString()}`}
                      {' '}
                    </Text>
                    <Text style={styles.content}>
                      rating:
                      {' '}
                      {Math.floor(item.rating)}
                      {' '}
                      / 100
                    </Text>
                    <Spacer />
                  </CollapseBody>
                </Collapse>

                <Collapse
                  isExpanded
                  onToggle={() => setExpanded(!expanded)}
                >
                  <CollapseHeader>
                    <Text style={styles.headerText}>Platforms</Text>
                  </CollapseHeader>
                  <CollapseBody>
                    {item.platforms && item.platforms.map(platform => (
                      <Text style={styles.content} key={platform.name}>{platform.name}</Text>
                    ))}
                  <Spacer />
                  </CollapseBody>
                </Collapse>

                <Collapse
                  isExpanded
                  onToggle={() => setExpanded(!expanded)}
                >
                  <CollapseHeader>
                    <Text style={styles.headerText}>Genres</Text>
                  </CollapseHeader>
                  <CollapseBody>
                    {item.genres && item.genres.map(genre => (
                      <Text style={styles.content} key={genre.name}>{genre.name}</Text>
                    ))}
                  </CollapseBody>
                </Collapse>
                <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                  {Screenshots(item)}
                </View>
              </View>
            </ParallaxScroll>
          </SafeAreaView>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: '100%',
    width: windowWidth,
    marginTop: 0,
    zIndex: 0,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
  },
  content: {
    alignSelf: 'center',
    color: '#e8f1fa',
  },
  summary: {
    alignSelf: 'center',
    color: 'white',
    padding: 20,
  },
  date: {
    fontSize: 18,
    alignSelf: 'center',
  },
  rating: {
    alignSelf: 'center',
  },
  fixedHeader: {
    zIndex: 1,
    width: windowWidth,
    padding: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  stickyHeader: {
    height: 40,
    width: windowWidth,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginTop: 0,
  },
  stickyHeaderBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
});

export default GameDetailScreen;
