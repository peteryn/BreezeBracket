import type { Node } from "@xyflow/react";
import { Match } from "./Match";


export type PositionLoggerNode = Node<{ label: string }, "position-logger">;
export type VerticalInputNode = Node<{ label: string }, "vertical-input">;
export type MatchNode = Node<Match, "match">;
export type StartingMatchNode = Node<Match, "starting-match">
export type EndingMatchNode = Node<Match, "ending-match">
export type AppNode = MatchNode | StartingMatchNode | EndingMatchNode;
