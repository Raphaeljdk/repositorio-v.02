"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Monitor, Server, Database, Wrench, Building2, Cloud, Brain,
} from "lucide-react";
import { skills, skillCategories, type SkillCategory } from "@/lib/data";
import "./skills-carousel.css";

/* ─── Map categories to Lucide icons ─── */
const CATEGORY_ICONS: Record<SkillCategory, ReactNode> = {
  frontend: <Monitor className="carousel-icon" />,
  backend: <Server className="carousel-icon" />,
  database: <Database className="carousel-icon" />,
  tools: <Wrench className="carousel-icon" />,
  corporate: <Building2 className="carousel-icon" />,
  cloud: <Cloud className="carousel-icon" />,
  ai: <Brain className="carousel-icon" />,
};

/* ─── Brand colors per category ─── */
const CATEGORY_ACCENTS: Record<SkillCategory, string> = {
  frontend: "#38bdf8",
  backend: "#f59e0b",
  database: "#a78bfa",
  tools: "#f43f5e",
  corporate: "#14b8a6",
  cloud: "#06b6d4",
  ai: "#D93838",
};

interface CarouselItemData {
  title: string;
  description: string;
  id: number;
  icon: ReactNode;
  accent: string;
  skillCount: number;
  topSkill: string;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 };

function CarouselItem({
  item, index, itemWidth, round, trackItemOffset, x, transition,
}: {
  item: CarouselItemData; index: number; itemWidth: number;
  round: boolean; trackItemOffset: number; x: ReturnType<typeof useMotionValue<number>>;
  transition: typeof SPRING_OPTIONS | { duration: number };
}) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      className={`carousel-item ${round ? "round" : ""}`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "100%",
        rotateY,
        ...(round && { borderRadius: "50%" }),
        "--item-accent": item.accent,
      } as React.CSSProperties}
      transition={transition}
    >
      <div className={`carousel-item-header ${round ? "round" : ""}`}>
        <span className="carousel-icon-container" style={{ backgroundColor: `${item.accent}20` }}>
          {item.icon}
        </span>
      </div>
      <div className="carousel-item-content">
        <div className="carousel-item-title">{item.title}</div>
        <p className="carousel-item-description">{item.description}</p>
        <div className="carousel-item-meta">
          <span className="carousel-item-count">{item.skillCount} habilidades</span>
          <span className="carousel-item-top">Principal: {item.topSkill}</span>
        </div>
      </div>
    </motion.div>
  );
}

interface SkillsCarouselProps {
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

export default function SkillsCarousel({
  baseWidth = 340,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
  round = false,
}: SkillsCarouselProps) {
  /* Build items from skills data grouped by category */
  const items: CarouselItemData[] = useMemo(() => {
    return skillCategories
      .filter((c) => c.id !== "all")
      .map((cat, i) => {
        const catSkills = skills.filter((s) => s.category === cat.id);
        const topSkill = catSkills.length > 0
          ? catSkills.reduce((a, b) => a.percent > b.percent ? a : b).name
          : "—";
        return {
          title: cat.label,
          description: catSkills.length > 0
            ? catSkills.slice(0, 3).map((s) => s.name).join(" · ")
            : "Em desenvolvimento",
          id: i + 1,
          icon: CATEGORY_ICONS[cat.id as SkillCategory] ?? <Monitor className="carousel-icon" />,
          accent: CATEGORY_ACCENTS[cat.id as SkillCategory] ?? "#D93838",
          skillCount: catSkills.length,
          topSkill,
        };
      });
  }, []);

  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const startingPos = loop ? 1 : 0;
  const [position, setPosition] = useState(startingPos);
  const x = useMotionValue(-(startingPos) * (baseWidth - 16 * 2 + 16));
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const initializedRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;
    const timer = setInterval(() => {
      setPosition((prev) => {
        const next = prev + 1;
        if (loop && next >= itemsForRender.length) return prev; // Will be handled by animation complete
        return Math.min(next, itemsForRender.length - 1);
      });
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      return;
    }
    const startingPosition = loop ? 1 : 0;
    x.set(-startingPosition * trackItemOffset);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition(startingPosition);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;
    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
      return;
    }
    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
      return;
    }
    setIsAnimating(false);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;
    if (direction === 0) return;
    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? "round" : ""}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: "50%" }),
      }}
    >
      <motion.div
        className="carousel-track"
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item.id}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              className={`carousel-indicator ${activeIndex === index ? "active" : "inactive"}`}
              aria-label={`Ir para slide ${index + 1}`}
              aria-current={activeIndex === index}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
