import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  MapPin,
  Bell,
  Search,
  Heart,
  Home,
  DollarSign,
  MessageCircle,
  User,
  MoreHorizontal,
  HandCoins,
  IndianRupee,
  Timer,
  Percent,
} from 'lucide-react-native';
import colors from '@/constants/colors';
import { loans, categories, banners, LoanItem } from '@/mocks/loans';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

function BannerCarousel() {

  return (
    <View style={bannerStyles.container}>
      <FlatList
        data={banners}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        snapToInterval={SCREEN_WIDTH - 60 + 16}
        decelerationRate="fast"
        contentContainerStyle={{ paddingRight: 16 }}
        renderItem={({ item }) => (
          <View style={bannerStyles.bannerItem}>
            <Image
              source={{ uri: item.image }}
              style={bannerStyles.bannerImage}
              contentFit="cover"
            />
            <View style={bannerStyles.bannerContent}>
              <Text style={bannerStyles.bannerSubtitle}>
                {item.id === '1' ? (
                  <>
                    <Text style={{ color: '#FFF' }}>Ab loan milega{"\n"}</Text>
                    <Text style={{ color: '#FCD34D' }}>Bumrah ki speed par</Text>
                  </>
                ) : (
                  item.subtitle
                )}
              </Text>
              <View style={bannerStyles.brandTag}>
                <Text style={bannerStyles.brandText}>L&T Finance</Text>
                <Text style={bannerStyles.brandMain}>JUST ZOOM</Text>
                <Text style={bannerStyles.brandSub}>TWO-WHEELER LOANS</Text>
              </View>
            </View>
          </View>
        )}
      />

    </View>
  );
}

const bannerStyles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  bannerItem: {
    width: SCREEN_WIDTH - 60,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#0A3D62',
    marginLeft: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  bannerSubtitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800' as const,
    lineHeight: 32,
  },
  brandTag: {
    marginTop: 'auto',
  },
  brandText: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: '700' as const,
  },
  brandMain: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900' as const,
    letterSpacing: 1,
  },
  brandSub: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600' as const,
    opacity: 0.8,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700' as const,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 20,
  },
});

function CategorySection() {
  return (
    <View style={catStyles.container}>
      <Text style={catStyles.title}>What Are You Looking For?</Text>
      <View style={catStyles.row}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={catStyles.item}
            activeOpacity={0.7}
          >
            <View style={catStyles.iconCircle}>
              {cat.icon ? (
                <Image
                  source={{ uri: cat.icon }}
                  style={catStyles.iconImage}
                  contentFit="cover"
                />
              ) : (
                <MoreHorizontal size={28} color={colors.primary} />
              )}
            </View>
            <Text style={catStyles.label}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const catStyles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
    width: (SCREEN_WIDTH - 64) / 4,
  },
  iconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F0EBFA',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E4DAF5',
  },
  iconImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '400' as const,
    color: colors.textPrimary,
    textAlign: 'center',
    // fontFamily: '',
    opacity: 0.8,
  },
});

function LoanCard({ item }: { item: LoanItem }) {
  const [liked, setLiked] = useState<boolean>(item.isFavorite);

  return (
    <View style={cardStyles.card}>
      <TouchableOpacity
        style={cardStyles.heartBtn}
        onPress={() => setLiked(!liked)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Heart
          size={13}
          color={liked ? colors.loanAmount : '#C4C4C4'}
          fill={liked ? colors.loanAmount : 'transparent'}
        />
      </TouchableOpacity>

      <View style={cardStyles.row}>
        <View style={cardStyles.imageWrap}>
          <Image
            source={{ uri: item.image }}
            style={cardStyles.image}
            contentFit="cover"
          />
        </View>
        <View style={cardStyles.info}>
          <View style={cardStyles.titleRow}>
            <Text style={cardStyles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={cardStyles.locationBadge}>
              <MapPin size={10} color={colors.accent} />
              <Text style={cardStyles.locationText} numberOfLines={1}>
                {item.location}
              </Text>
            </View>
          </View>
          <Text style={cardStyles.loanAmount}>Loan : {item.loanAmount}</Text>
          <View style={cardStyles.tagsRow}>
            <View
              style={[cardStyles.tag, { backgroundColor: colors.tagGreen }]}
            >
              <IndianRupee size={10} color={colors.green} />
              <Text
                style={[cardStyles.tagText, { color: colors.tagGreenText }]}
                numberOfLines={1}
              >
                {item.detail1Value}
              </Text>
            </View>
            <View
              style={[cardStyles.tag, { backgroundColor: colors.tagOrange }]}
            >
              <Timer size={10} color={colors.orange} />
              <Text
                style={[cardStyles.tagText, { color: colors.tagOrangeText }]}
                numberOfLines={1}
              >
                {item.detail2Value}
              </Text>
            </View>
            <View style={[cardStyles.tag, { backgroundColor: colors.tagBlue }]}>
                <Percent size={10} color={colors.blue} />
              <Text
                style={[cardStyles.tagText, { color: colors.tagBlueText }]}
                numberOfLines={1}
              >
                {item.detail3Value}
              </Text>
            </View>
          </View>
          <View style={cardStyles.labelsRow}>
            <Text style={cardStyles.labelText} numberOfLines={1}>
              {item.detail1Label}
            </Text>
            <Text style={cardStyles.labelText} numberOfLines={1}>
              {item.detail2Label}
            </Text>
            <Text style={cardStyles.labelText} numberOfLines={1}>
              {item.detail3Label}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
    }),
  },
  heartBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {  shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,},
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
    }),
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 8,
    flexShrink: 0,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(0,0,0,0.2)',
      },
    }),
  },
  locationText: {
    fontSize: 10,
    color: colors.accent,
    fontWeight: '600' as const,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  imageWrap: {
    width: 120,
    height: 90,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    paddingTop: 4,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.textPrimary,
    flex: 1,
    minWidth: 0,
  },
  loanAmount: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.loanAmount,
    marginTop: 2,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 2,
    width: '32%',
    minWidth: 0,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(0,0,0,0.2)',
      },
    }),
  },
  tagDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '400' as const,
  },
  labelsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
    flexWrap: 'nowrap',
  },
  labelText: {
    fontSize: 9,
    color: colors.textLight,
    fontWeight: '500' as const,
    flex: 1,
  },
});

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('home');

  // ── Scroll-driven header collapse ──────────────────────────────────
  const scrollY = useRef(new Animated.Value(0)).current;

  // Height of the collapsible portion (headerRow only — logo stays visible)
  const COLLAPSE_HEIGHT = 52; // headerRow height
  const THRESHOLD = 40;       // how many px of scroll before fully collapsed

  const topSectionHeight = scrollY.interpolate({
    inputRange: [0, THRESHOLD],
    outputRange: [COLLAPSE_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  const topSectionOpacity = scrollY.interpolate({
    inputRange: [0, THRESHOLD * 0.6],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const topSectionTranslateY = scrollY.interpolate({
    inputRange: [0, THRESHOLD],
    outputRange: [0, -COLLAPSE_HEIGHT],
    extrapolate: 'clamp',
  });
  // ──────────────────────────────────────────────────────────────────

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'myloans', label: 'My Loans', icon: HandCoins },
    { id: 'apply', label: 'Apply Loan', icon: DollarSign },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'account', label: 'MyAccount', icon: User },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Absolute gradient background that covers header + banner area */}
      <LinearGradient
        colors={[
          colors.primaryDark,
          colors.primary,
          colors.primary,
          'rgba(109, 40, 217, 0.75)',
          'rgba(109, 40, 217, 0.3)',
          'transparent',
        ]}
        locations={[0, 0.2, 0.45, 0.65, 0.82, 1]}
        style={styles.gradientBg}
      />

      {/* Header content */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        {/* Always visible: logo */}
        <Text style={styles.logo}>Local Loans</Text>

        {/* Collapsible: menu / location / bell row */}
        <Animated.View
          style={[
            styles.headerTopSection,
            {
              height: topSectionHeight,
              opacity: topSectionOpacity,
              transform: [{ translateY: topSectionTranslateY }],
            },
          ]}
          pointerEvents="box-none"
        >
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7}>
              <View style={styles.menuIcon}>
                <View style={[styles.menuBar, styles.menuBarTop]} />
                <View style={[styles.menuBar, styles.menuBarMiddle]} />
                <View style={[styles.menuBar, styles.menuBarBottom]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationChip} activeOpacity={0.7}>
              <MapPin size={14} color={colors.white} />
              <Text style={styles.locationLabel}>Kakinada</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
              <Bell size={22} color={colors.white} />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Always visible: search bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.white} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <BannerCarousel />
        <View style={styles.whiteContent}>
          <CategorySection />

          <View style={styles.discoverSection}>
            <Text style={styles.discoverTitle}>Discover all loans near you</Text>
          </View>

          {loans.map((loan) => (
            <LoanCard key={loan.id} item={loan} />
          ))}
        </View>
      </Animated.ScrollView>

      <View
        style={[
          styles.bottomTab,
          { height: 75 + Math.max(insets.bottom - 10, 0) },
          { paddingBottom: insets.bottom },
        ]}
      >
        {tabs.map((tab) => {
          const isApply = tab.id === 'apply';
          const isActive = activeTab === tab.id;
          const IconComp = tab.icon;

          if (isApply) {
            return (
              <TouchableOpacity
                key={tab.id}
                style={styles.applyBtnWrap}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.9}
              >
                <View style={styles.applyRibbon}>
                  <View style={styles.ribbonFoldContainer}>
                    <View style={styles.ribbonFoldLeft} />
                    <View style={styles.ribbonFoldRight} />
                    {/* <View style={styles.ribbonFoldMain} /> */}
                  </View>
                  <View style={styles.applyIconCircle}>
                    <DollarSign size={26} color="#FF0080" strokeWidth={3} />
                  </View>
                  <Text style={styles.applyLabelWhite}>Apply Loan</Text>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabItem}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.7}
            >
              <IconComp
                size={22}
                color={isActive ? colors.tabActive : colors.accent}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? colors.tabActive : colors.accent },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    overflow: 'hidden',
  },
  headerTopSection: {
    overflow: 'hidden',
  },
  logo: {
    fontSize: 20,
    fontWeight: '600' as const,
    fontStyle: 'normal',
    color: colors.white,
    letterSpacing: 0.4,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuBtn: {
    padding: 4,
    width: 28,
    height: 24,
    justifyContent: 'center',
  },
  menuIcon: {
    justifyContent: 'space-between',
    height: 16,
  },
  menuBar: {
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.88)',
  },
  menuBarTop: {
    width: 24,
  },
  menuBarMiddle: {
    width: 18,
  },
  menuBarBottom: {
    width: 24,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 27, 75, 0.6)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    marginLeft: 0,
  },
  locationLabel: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600' as const,
  },
  bellBtn: {
    padding: 4,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4B4B',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.white,
    paddingVertical: 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  whiteContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginTop: 12,
    paddingTop: 4,
  },
  discoverSection: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 14,
  },
  discoverTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  bottomTab: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
    flex: 1,
    
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '400' as const,
    
  },
  applyBtnWrap: {
    alignItems: 'center',
    width: 90,
    marginTop: -10, // Anchor closer to the bar top
    zIndex: 10,
    height: 80,
  },
  ribbonFoldContainer: {
    width: 96,
    height: 12,
    top: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  ribbonFoldMain: {
    width: 75,
    height: 8,
    backgroundColor: '#980044',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    zIndex: 2,
  },
  ribbonFoldLeft: {
    position: 'absolute',
    bottom: -3,

    left: -9,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderBottomWidth: 15,
    borderLeftWidth: 18,
    borderBottomColor: '#EB008B',
    borderLeftColor: 'transparent',
  },
  ribbonFoldRight: {
    position: 'absolute',
    bottom: -3,
    right: -9,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderBottomWidth: 15,
    borderRightWidth: 18,
    borderBottomColor: '#EB008B',
    borderRightColor: 'transparent',
    zIndex: -1,
  },
  applyRibbon: {
    backgroundColor: '#FF0080',
    width: 78,
    height: 90,
    alignItems: 'center',
    paddingTop: 12,
    // Pronounced trapezoid
    transform: [{ perspective: 120 }, { rotateX: '-18deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
    // borderTopRightRadius:10,
  },
  applyIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  applyLabelWhite: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#FFF',
    textAlign: 'center',
    width: '100%',
    letterSpacing: -0.2,
    marginTop: 2,
  },
});
