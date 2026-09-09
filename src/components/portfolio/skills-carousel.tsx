"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Monitor, Server, Database, Wrench, Building2, Cloud, Brain,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { skills, skillCategories, type SkillCategory } from "@/lib/data";
import "./skills-carousel.css";

/* ─── Map categories to Lucide icons (fallback) ─── */
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
  topSkillIcon: string;
  topSkillPercent: number;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 400;
const GAP = 16;
/* Snappy, elegant spring — critically damped with shorter settle tail */
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 200, damping: 26, mass: 0.8 };

/* ─── SVG Radial Progress Arc (memoized via useMemo in parent) ─── */
function RadialProgressArc({ percent, accent, size }: { percent: number; accent: string; size: number }) {
  const strokeWidth = 2;
  const radius = (size / 2) - strokeWidth - 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const center = size / 2;

  return (
    <svg
      className="carousel-progress-svg"
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="carousel-progress-track"
        cx={center}
        cy={center}
        r={radius}
      />
      <circle
        className="carousel-progress-arc"
        cx={center}
        cy={center}
        r={radius}
        stroke={accent}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          "--progress-circumference": circumference,
          "--progress-offset": offset,
          transform: `rotate(-90deg)`,
          transformOrigin: `${center}px ${center}px`,
        } as React.CSSProperties}
      />
      {percent > 0 && percent < 100 && (
        <circle
          className="carousel-progress-endcap"
          cx={center + radius * Math.cos(((percent / 100) * 360 - 90) * (Math.PI / 180))}
          cy={center + radius * Math.sin(((percent / 100) * 360 - 90) * (Math.PI / 180))}
          r={1.5}
          fill={accent}
        />
      )}
    </svg>
  );
}

function CarouselItem({
  item, index, itemWidth, round, trackItemOffset, x, transition,
}: {
  item: CarouselItemData; index: number; itemWidth: number;
  round: boolean; trackItemOffset: number; x: ReturnType<typeof useMotionValue<number>>;
  transition: typeof SPRING_OPTIONS | { duration: number };
}) {
  /* Subtle 3D rotation — gentle coverflow, no ghost artifacts */
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const rotateYOutputRange = [18, 0, -18];
  const rotateY = useTransform(x, range, rotateYOutputRange, { clamp: true });

  /* Distance-based opacity: center item full, neighbors fade gracefully */
  const opacityRange = [0.35, 1, 0.35];
  const itemOpacity = useTransform(x, range, opacityRange, { clamp: true });

  /* Subtle scale: center item slightly larger */
  const scaleRange = [0.92, 1, 0.92];
  const itemScale = useTransform(x, range, scaleRange, { clamp: true });

  const arcSize = itemWidth + 10;

  return (
    <motion.div
      className={`carousel-item ${round ? "round" : ""}`}
      style={{
        width: itemWidth,
        height: itemWidth,
        rotateY,
        opacity: itemOpacity,
        scale: itemScale,
        borderRadius: "50%",
        "--item-accent": item.accent,
      } as React.CSSProperties}
      transition={transition}
    >
      {round ? (
        <>
          <RadialProgressArc
            percent={item.topSkillPercent}
            accent={item.accent}
            size={arcSize}
          />
          <div className="carousel-circle-content">
            <span className="carousel-circle-icon" style={{ backgroundColor: `${item.accent}10`, borderColor: `${item.accent}25` }}>
              {item.topSkillIcon ? (
                <Image
                  src={item.topSkillIcon}
                  alt={item.topSkill}
                  className="carousel-skill-logo"
                  width={32}
                  height={32}
                  unoptimized
                />
              ) : (
                item.icon
              )}
            </span>
            <div className="carousel-circle-title">{item.title}</div>
            <div className="carousel-circle-top">{item.topSkill}</div>
            <div className="carousel-circle-desc">{item.description}</div>
            <div className="carousel-circle-meta">
              <span className="carousel-circle-percent" style={{ color: item.accent }}>{item.topSkillPercent}%</span>
              <span className="carousel-circle-separator">·</span>
              <span className="carousel-skill-count-badge" style={{ borderColor: `${item.accent}20`, color: item.accent }}>
                {item.skillCount} hab.
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="carousel-item-header">
            <span className="carousel-icon-container" style={{ backgroundColor: `${item.accent}18` }}>
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
        </>
      )}
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
  const items: CarouselItemData[] = useMemo(() => {
    return skillCategories
      .filter((c) => c.id !== "all")
      .map((cat, i) => {
        const catSkills = skills.filter((s) => s.category === cat.id);
        const topSkillObj = catSkills.length > 0
          ? catSkills.reduce((a, b) => a.percent > b.percent ? a : b)
          : null;
        return {
          title: cat.label,
          description: catSkills.length > 0
            ? catSkills.slice(0, 3).map((s) => s.name).join(" · ")
            : "Em desenvolvimento",
          id: i + 1,
          icon: CATEGORY_ICONS[cat.id as SkillCategory] ?? <Monitor className="carousel-icon" />,
          accent: CATEGORY_ACCENTS[cat.id as SkillCategory] ?? "#D93838",
          skillCount: catSkills.length,
          topSkill: topSkillObj?.name ?? "—",
          topSkillIcon: topSkillObj?.icon ?? "",
          topSkillPercent: topSkillObj?.percent ?? 0,
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
        if (loop && next >= itemsForRender.length) return prev;
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

  const handlePrev = () => {
    setPosition((prev) => {
      const next = prev - 1;
      if (loop && next < 0) return prev;
      return Math.max(0, next);
    });
  };

  const handleNext = () => {
    setPosition((prev) => {
      const next = prev + 1;
      const max = itemsForRender.length - 1;
      if (loop && next > max) return prev;
      return Math.min(next, max);
    });
  };

  const currentItem = items[activeIndex];

  return (
    <>
      <div
        ref={containerRef}
        className={`carousel-container ${round ? "round" : ""}`}
        style={{
          width: `${baseWidth}px`,
          height: round ? `${baseWidth}px` : `${itemWidth + 60}px`,
          "--item-accent": currentItem?.accent ?? "#D93838",
        } as React.CSSProperties}
      >
        {/* Navigation Arrows */}
        <div className="carousel-nav-arrows">
          <button
            type="button"
            className="carousel-nav-btn"
            onClick={handlePrev}
            aria-label="Slide anterior"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="carousel-nav-btn"
            onClick={handleNext}
            aria-label="Próximo slide"
          >
            <ChevronRight />
          </button>
        </div>

        <motion.div
          className="carousel-track"
          drag={isAnimating ? false : "x"}
          {...dragProps}
          style={{
            width: itemWidth,
            gap: `${GAP}px`,
            perspective: 2000,
            x,
            willChange: "transform",
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
      </div>
      {/* Indicators rendered outside container — positioned at bottom by parent */}
      <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
        <div className="carousel-indicators">
          {items.map((item, index) => (
            <motion.button
              type="button"
              key={index}
              className={`carousel-indicator ${activeIndex === index ? "active" : "inactive"}`}
              aria-label={`Ir para ${item.title}`}
              aria-current={activeIndex === index}
              animate={{
                scale: activeIndex === index ? 1.1 : 1,
                backgroundColor: activeIndex === index ? item.accent : undefined,
              }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
        {currentItem && (
          <span className="carousel-indicator-label" style={{ color: currentItem.accent }}>
            {currentItem.title}
          </span>
        )}
      </div>
    </>
  );
}
