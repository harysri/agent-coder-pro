import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Enhanced AI response formatter
 * Supports:
 * - Bold-style headings (**Heading:**)
 * - Markdown headings (#, ##, ###, ####)
 * - Paragraphs with inline formatting
 * - Nested bullet lists (*, -, •, +) with proper indentation
 * - Nested numbered lists
 * - Multi-line list items
 * - Code blocks with syntax highlighting
 * - Inline code (`code`)
 * - Horizontal rules (---)
 * - Blockquotes (>)
 * - Strong/emphasis text (**bold**, *italic*)
 * - Sub-headings (#### and bold-style)
 */
export function formatResponse(text) {
  if (!text) return null;

  const lines = text.split("\n");
  const elements = [];
  let codeBlock = null;
  let inList = false;
  let listType = null; // 'ul' or 'ol'
  let listItems = [];
  let listIndentLevel = 0;
  let inBlockquote = false;
  let blockquoteContent = [];

  // Helper to flush any pending list
  const flushList = () => {
    if (listItems.length > 0) {
      const ListComponent = listType === "ol" ? "ol" : "ul";
      const listStyle =
        listType === "ol"
          ? "list-decimal pl-6 space-y-1"
          : "list-disc pl-6 space-y-1";

      elements.push(
        <ListComponent
          key={`list-${elements.length}`}
          className={`${listStyle} text-gray-300 my-2`}
        >
          {listItems.map((item, idx) => (
            <li key={idx} className="mb-1">
              {formatInlineMarkdown(item.content)}
            </li>
          ))}
        </ListComponent>,
      );
      listItems = [];
    }
    inList = false;
    listType = null;
  };

  // Helper to flush blockquote
  const flushBlockquote = () => {
    if (blockquoteContent.length > 0) {
      elements.push(
        <blockquote
          key={`blockquote-${elements.length}`}
          className="border-l-4 border-purple-500/50 pl-4 my-3 italic text-gray-300 bg-black/20 py-2 rounded-r"
        >
          {blockquoteContent.map((line, idx) => (
            <p key={idx} className="mb-1 last:mb-0">
              {formatInlineMarkdown(line)}
            </p>
          ))}
        </blockquote>,
      );
      blockquoteContent = [];
    }
    inBlockquote = false;
  };

  lines.forEach((line, index) => {
    // ---------- CODE BLOCK ----------
    if (line.startsWith("```")) {
      if (codeBlock === null) {
        // Start of code block
        flushList();
        flushBlockquote();
        const lang = line.replace(/```/, "").trim() || "text";
        codeBlock = { lang, content: [] };
      } else {
        // End of code block
        elements.push(
          <div key={index} className="my-4">
            <SyntaxHighlighter
              language={codeBlock.lang}
              style={oneDark}
              customStyle={{
                borderRadius: "10px",
                padding: "16px",
                fontSize: "14px",
                margin: 0,
              }}
            >
              {codeBlock.content.join("\n")}
            </SyntaxHighlighter>
          </div>,
        );
        codeBlock = null;
      }
      return;
    }

    if (codeBlock) {
      codeBlock.content.push(line);
      return;
    }

    // ---------- BLOCKQUOTE ----------
    if (line.trim().startsWith(">")) {
      const cleanLine = line.replace(/^>\s*/, "").trim();
      if (!inBlockquote) {
        flushList();
        inBlockquote = true;
      }
      blockquoteContent.push(cleanLine);
      return;
    } else if (inBlockquote) {
      flushBlockquote();
    }

    // ---------- HORIZONTAL RULE ----------
    if (line.trim().match(/^---+\s*$/)) {
      flushList();
      flushBlockquote();
      elements.push(
        <hr key={index} className="my-6 border-white/20 border-t-2" />,
      );
      return;
    }

    // ---------- HEADINGS ----------

    // Bold-style headings with optional colon (**: ** or **:**)
    const boldHeadingMatch = line.match(/^\*\*(.+?)(?::?)\*\*\s*$/);
    if (boldHeadingMatch) {
      flushList();
      flushBlockquote();
      const headingText = boldHeadingMatch[1].trim();
      // Check if it's a subheading by looking at context or formatting
      const isSubHeading = line.match(/^\*\*\*\*/) || headingText.length < 30; // Simple heuristic

      elements.push(
        <h3
          key={index}
          className={`font-semibold mt-6 mb-3 text-purple-300 ${
            isSubHeading ? "text-base" : "text-lg"
          }`}
        >
          {headingText}
        </h3>,
      );
      return;
    }

    // Markdown headings (including #### for subheadings)
    if (line.startsWith("####")) {
      flushList();
      flushBlockquote();
      elements.push(
        <h4
          key={index}
          className="text-base font-semibold mt-4 mb-2 text-purple-300/90"
        >
          {line.replace(/^#+\s*/, "").trim()}
        </h4>,
      );
      return;
    }
    if (line.startsWith("###")) {
      flushList();
      flushBlockquote();
      elements.push(
        <h3 key={index} className="text-lg font-bold mt-4 mb-3 text-purple-300">
          {line.replace(/^#+\s*/, "").trim()}
        </h3>,
      );
      return;
    }
    if (line.startsWith("##")) {
      flushList();
      flushBlockquote();
      elements.push(
        <h2 key={index} className="text-xl font-bold mt-6 mb-4 text-purple-200">
          {line.replace(/^#+\s*/, "").trim()}
        </h2>,
      );
      return;
    }
    if (line.startsWith("#")) {
      flushList();
      flushBlockquote();
      elements.push(
        <h1
          key={index}
          className="text-2xl font-bold mt-6 mb-4 text-purple-100"
        >
          {line.replace(/^#+\s*/, "").trim()}
        </h1>,
      );
      return;
    }

    // ---------- LISTS ----------

    // Check if line starts a list item
    const bulletMatch = line.match(/^(\s*)([\*\-\+•])\s+(.+)/);
    const numberedMatch = line.match(/^(\s*)(\d+)\.\s+(.+)/);

    if (bulletMatch || numberedMatch) {
      const match = bulletMatch || numberedMatch;
      const [, indent, marker, content] = match;
      const indentLevel = indent.length;
      const isBullet = !!bulletMatch;
      const currentListType = isBullet ? "ul" : "ol";

      // If we're starting a new list or the list type changes
      if (
        !inList ||
        listType !== currentListType ||
        Math.abs(indentLevel - listIndentLevel) > 2
      ) {
        flushList();
        inList = true;
        listType = currentListType;
        listIndentLevel = indentLevel;
      }

      listItems.push({ content, indentLevel });
      return;
    }

    // If we're in a list and this line continues the previous item
    if (inList && line.trim() && !line.match(/^\s*$/)) {
      // Check if it's continuation of previous list item (indented)
      if (line.match(/^\s{2,}/) && listItems.length > 0) {
        const lastItem = listItems[listItems.length - 1];
        lastItem.content += " " + line.trim();
        return;
      } else {
        // Not a continuation, flush the list
        flushList();
      }
    }

    // If we were in a list and now we have a non-list line
    if (inList && !line.trim()) {
      flushList();
    }

    // ---------- PARAGRAPHS ----------
    if (line.trim()) {
      // Check if it's a standalone bold/italic line
      if (line.match(/^\*\*.+\*\*$/) || line.match(/^\*.+\*$/)) {
        flushList();
        flushBlockquote();
        elements.push(
          <p
            key={index}
            className="text-gray-200 font-medium my-3 leading-relaxed"
          >
            {formatInlineMarkdown(line)}
          </p>,
        );
      } else {
        flushList();
        flushBlockquote();
        elements.push(
          <p key={index} className="text-gray-300 text-sm leading-relaxed my-3">
            {formatInlineMarkdown(line)}
          </p>,
        );
      }
    } else {
      flushList();
      flushBlockquote();
      if (elements.length > 0 && elements[elements.length - 1].type !== "br") {
        elements.push(<br key={index} />);
      }
    }
  });

  // Flush any remaining lists or blockquotes
  flushList();
  flushBlockquote();

  return elements;
}

/* ---------- ENHANCED INLINE MARKDOWN FORMATTER ---------- */
function formatInlineMarkdown(text) {
  if (!text) return text;

  const parts = [];
  let remaining = text;

  // Process inline formatting
  while (remaining.length > 0) {
    // Check for inline code first
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Check for bold text
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    // Check for italic text
    const italicMatch = remaining.match(/\*([^*]+)\*/);

    // Find the earliest match
    let match = null;
    let matchType = null;
    let matchIndex = Infinity;

    if (codeMatch && codeMatch.index < matchIndex) {
      match = codeMatch;
      matchType = "code";
      matchIndex = codeMatch.index;
    }
    if (boldMatch && boldMatch.index < matchIndex) {
      match = boldMatch;
      matchType = "bold";
      matchIndex = boldMatch.index;
    }
    if (italicMatch && italicMatch.index < matchIndex) {
      match = italicMatch;
      matchType = "italic";
      matchIndex = italicMatch.index;
    }

    if (match) {
      // Add text before the match
      if (matchIndex > 0) {
        parts.push(remaining.substring(0, matchIndex));
      }

      // Add the formatted element
      switch (matchType) {
        case "code":
          parts.push(
            <code
              key={parts.length}
              className="bg-black/50 px-1.5 py-0.5 rounded text-purple-300 font-mono text-xs mx-0.5"
            >
              {match[1]}
            </code>,
          );
          break;
        case "bold":
          parts.push(
            <strong key={parts.length} className="font-semibold text-gray-100">
              {match[1]}
            </strong>,
          );
          break;
        case "italic":
          parts.push(
            <em key={parts.length} className="italic text-gray-200">
              {match[1]}
            </em>,
          );
          break;
      }

      // Remove processed part from remaining
      remaining = remaining.substring(matchIndex + match[0].length);
    } else {
      // No more formatting, add the rest
      parts.push(remaining);
      remaining = "";
    }
  }

  return parts.map((part, i) =>
    React.isValidElement(part) ? React.cloneElement(part, { key: i }) : part,
  );
}
