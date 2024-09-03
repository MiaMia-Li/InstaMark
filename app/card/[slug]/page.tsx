"use client";
import { useRef, useEffect, useState } from "react";
import PageContent from "@/components/PageContent";
import AnimationWrapper from "@/components/AnimationWrapper";
import WeddingAnnouncement from "@/components/WeddingAnnouncement";

const Card = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const config = {
    pages: [
      {
        img: "https://h5cdn.hunbei.com/editorCustomPic/2022-8-5-fiDPG7JEfcQEp6remdZjfMZAQ4M4FJGC.jpeg?imageMogr2/auto-orient/thumbnail/1072x1608",
        text: "hello",
      },
      {
        img: "https://h5cdn.hunbei.com/editorCustomPic/2022-8-5-fiDPG7JEfcQEp6remdZjfMZAQ4M4FJGC.jpeg?imageMogr2/auto-orient/thumbnail/1072x1608",
        text: "hello",
      },
    ],
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const scrollHeight = scrollElement.scrollHeight;
    const clientHeight = scrollElement.clientHeight;

    let animationFrameId: number;

    const scroll = () => {
      if (scrollPosition < scrollHeight - clientHeight) {
        setScrollPosition((prev) => prev + 1); // 每帧滚动1像素，可以根据需要调整
        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollPosition]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <div ref={scrollRef} className="h-screen overflow-hidden">
      <WeddingAnnouncement />
    </div>
  );
};

export default Card;
