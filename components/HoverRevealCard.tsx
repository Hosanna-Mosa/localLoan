import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import {
  Heart,
  MapPin,
  ArrowUpRight,
  Clock,
  Percent,
} from 'lucide-react-native';
import colors from '@/constants/colors';
import { LoanItem } from '@/mocks/loans';

interface HoverRevealCardProps {
  item: LoanItem;
}

export function HoverRevealCard({ item }: HoverRevealCardProps) {
  const [liked, setLiked] = useState<boolean>(item.isFavorite);
  const [isHovered, setIsHovered] = useState(false);

  // Animation values
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const revealHeightAnim = useRef(new Animated.Value(0)).current;
  const shadowAnim = useRef(new Animated.Value(6)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleHoverIn = () => {
    setIsHovered(true);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.03,
        useNativeDriver: true,
        friction: 8,
      }),
      Animated.timing(revealHeightAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: false,
      }),
      Animated.timing(shadowAnim, {
        toValue: 20,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
      }),
      Animated.timing(revealHeightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(shadowAnim, {
        toValue: 6,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Interpolated values
  const cardElevation = shadowAnim.interpolate({
    inputRange: [6, 20],
    outputRange: [6, 20],
  });

  const revealOpacity = revealHeightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const revealTranslateY = revealHeightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Get dynamic gradient colors based on item type
  const getGradientColors = () => {
    if (item.title.toLowerCase().includes('gold')) {
      return ['#FFD700', '#FFA500'];
    } else if (
      item.title.toLowerCase().includes('vehicle') ||
      item.title.toLowerCase().includes('car') ||
      item.title.toLowerCase().includes('kia')
    ) {
      return ['#3B82F6', '#1D4ED8'];
    } else if (
      item.title.toLowerCase().includes('property') ||
      item.title.toLowerCase().includes('house')
    ) {
      return ['#10B981', '#059669'];
    } else if (item.title.toLowerCase().includes('business')) {
      return ['#8B5CF6', '#7C3AED'];
    }
    return [colors.primary, colors.primaryDark];
  };

  return (
    <Pressable
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      onPress={handleHoverIn}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: scaleAnim }, { perspective: 1000 }],
            shadowOpacity: shadowAnim.interpolate({
              inputRange: [6, 20],
              outputRange: [0.06, 0.15],
            }),
          },
          Platform.select({
            ios: {
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: cardElevation,
            },
            android: {
              elevation: cardElevation,
            },
            web: {
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: cardElevation,
            },
          }),
        ]}
      >
        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Image Section */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />
            {/* Gradient Overlay on Image */}
            <View
              style={[
                styles.imageOverlay,
                { backgroundColor: getGradientColors()[0] + '40' },
              ]}
            />

            {/* Loan Amount Badge */}
            <View
              style={[
                styles.loanBadge,
                { backgroundColor: getGradientColors()[0] },
              ]}
            >
              <Text style={styles.loanBadgeText}>{item.loanAmount}</Text>
            </View>
          </View>

          {/* Info Section */}
          <View style={styles.infoContainer}>
            {/* Title & Location */}
            <View style={styles.headerRow}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <TouchableOpacity
                onPress={() => setLiked(!liked)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Heart
                  size={18}
                  color={liked ? colors.heartPink : colors.textLight}
                  fill={liked ? colors.heartPink : 'transparent'}
                />
              </TouchableOpacity>
            </View>

            {/* Location */}
            <View style={styles.locationRow}>
              <MapPin size={12} color={colors.accent} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>

            {/* Quick Info Tags - Always Visible */}
            <View style={styles.quickInfoRow}>
              <View style={styles.quickInfoTag}>
                <Text style={styles.quickInfoLabel}>{item.detail1Label}</Text>
                <Text style={styles.quickInfoValue}>{item.detail1Value}</Text>
              </View>
              <View style={styles.quickInfoTag}>
                <Text style={styles.quickInfoLabel}>{item.detail2Label}</Text>
                <Text style={styles.quickInfoValue}>{item.detail2Value}</Text>
              </View>
            </View>

            {/* Hover Reveal Section */}
            <Animated.View
              style={[
                styles.revealSection,
                {
                  opacity: revealOpacity,
                  transform: [{ translateY: revealTranslateY }],
                  maxHeight: revealHeightAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                },
              ]}
            >
              <View style={styles.revealDivider} />

              {/* Detailed Info Grid */}
              <View style={styles.detailGrid}>
                <View style={styles.detailItem}>
                  <View
                    style={[
                      styles.detailIcon,
                      { backgroundColor: colors.tagGreen + '20' },
                    ]}
                  >
                    <Percent size={14} color={colors.green} />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>{item.detail3Label}</Text>
                    <Text style={styles.detailValue}>{item.detail3Value}</Text>
                  </View>
                </View>

                <View style={styles.detailItem}>
                  <View
                    style={[
                      styles.detailIcon,
                      { backgroundColor: colors.tagBlue + '20' },
                    ]}
                  >
                    <Clock size={14} color={colors.blue} />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Approval Time</Text>
                    <Text style={styles.detailValue}>24 Hours</Text>
                  </View>
                </View>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: getGradientColors()[0] },
                ]}
              >
                <Text style={styles.actionButtonText}>Apply Now</Text>
                <ArrowUpRight size={16} color={colors.white} />
              </TouchableOpacity>

              {/* Hover Indicator */}
              <Text style={styles.hoverHint}>
                {isHovered ? 'Tap to collapse' : 'Hover for details'}
              </Text>
            </Animated.View>
          </View>
        </View>

        {/* Expand Indicator */}
        <Animated.View
          style={[
            styles.expandIndicator,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        >
          <ArrowUpRight size={14} color={colors.textLight} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  mainContent: {
    flexDirection: 'row',
    padding: 14,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loanBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  loanBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
    lineHeight: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  quickInfoRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  quickInfoTag: {
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    flex: 1,
  },
  quickInfoLabel: {
    fontSize: 9,
    color: colors.textLight,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  quickInfoValue: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '700',
    marginTop: 2,
  },
  revealSection: {
    overflow: 'hidden',
  },
  revealDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 12,
    marginBottom: 12,
  },
  detailGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 10,
    gap: 8,
  },
  detailIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 9,
    color: colors.textLight,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '700',
    marginTop: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  hoverHint: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.textLight,
    marginTop: 8,
    fontStyle: 'italic',
  },
  expandIndicator: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HoverRevealCard;
