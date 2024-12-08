import { type NodeTypes } from "@xyflow/react";

import { AppNode } from "./types";
import { StartingMatchNode } from "./StartingMatchNode";
import { EndingMatchNode } from "./EndingMatchNode";
import { RoundNodeComponent } from "./RoundNodeComponent";

import { SwissBracket, levelOrderTraversal } from "../../BracketLion/SwissBracket";
import { RoundNodeType } from "./RoundNodeType";
import { StartingNodeComponent } from "./StartingNodeComponent";
import { EndingNodeUpperComponent } from "./EndingNodeUpperComponent";
import { QualifiedNodeComponent } from "./QualifiedNodeComponent";
import { ExitNodeType } from "./ExitNodeType";
export const swiss = new SwissBracket();

export let initialNodes: AppNode[] = [];

export function createSwissNodes(swiss: SwissBracket) {
	const initialNodes: AppNode[] = [];
	let idVal = 0;
	let xVal = 0;
	let yVal = 0;
	let levelNumber = 1;
	levelOrderTraversal(swiss.data.rootRound, undefined, (level) => {
		yVal = 0;
		// TODO: rewrite to use the formulas described below
		if (levelNumber === 1) {
		}
		if (levelNumber === 2) {
			yVal = -25;
		}
		if (levelNumber === 3) {
			yVal = -50;
		}
		if (levelNumber === 4) {
			yVal = 79;
		}
		if (levelNumber === 5) {
			yVal = 260;
		}
		levelNumber++;

		level.forEach((node) => {
			const inputHandleId = `${node.name}:Input`;
			const outputHandleId = `${node.name}:Output`;
			const roundNodeType = new RoundNodeType(
				node.name,
				node,
				swiss,
				undefined,
				inputHandleId,
				outputHandleId
			);

			let obj: AppNode | undefined;
			switch (node.name) {
				case "0-0":
					obj = {
						id: node.name,
						position: { x: xVal, y: yVal },
						data: roundNodeType,
						type: "starting-node-component",
					};
					break;
				case "2-0":
				case "2-1":
					obj = {
						id: node.name,
						position: { x: xVal, y: yVal },
						data: roundNodeType,
						type: "ending-node-upper-component",
					};
					break;
				default:
					obj = {
						id: node.name,
						position: { x: xVal, y: yVal },
						data: roundNodeType,
						type: "round-node-component",
					};
			}

			initialNodes.push(obj);

			if (node.name === "2-0") {
				let qualObj: AppNode = {
					id: `test`,
					position: { x: xVal + 350, y: yVal },
					data: new ExitNodeType(swiss, "2-0"),
					type: "qualified-node-component",
				};
				initialNodes.push(qualObj);
			}

			idVal++;

			const numMatches = node.numTeams / 2;
			const headerOffset = 30; // 29
			const versusHeight = 104;
			const gap = 20;
			yVal += numMatches * versusHeight + headerOffset + gap;
			// header offset must be found through trial and error
			// r1: 30 + 8*104 = 862
			// r2: 30*2 + 8*104 + 20 = 912
			// r3: 30*3 + 8*104 + 40 = 962
			// r4: 30*2 + 6*104 + 20 = 704
			// r5: 30 + 3*104 = 342
			// example: to center r5
			// yVal = (r1 - r5) / 2
		});

		xVal += 350;
	});
	return initialNodes;
}

initialNodes = createSwissNodes(swiss);

export const nodeTypes = {
	// Add any of your custom nodes here!
	"starting-match": StartingMatchNode,
	"ending-match": EndingMatchNode,
	"round-node-component": RoundNodeComponent,
	"starting-node-component": StartingNodeComponent,
	"ending-node-upper-component": EndingNodeUpperComponent,
	"qualified-node-component": QualifiedNodeComponent,
} satisfies NodeTypes;
