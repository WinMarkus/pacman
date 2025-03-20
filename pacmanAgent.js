/*
 * PacmanAgent Interface
 * This file defines the interface for creating Pacman AI agents
 */

class PacmanAgent {
    constructor(game, map) {
        this.game = game;
        this.map = map;
        this.position = null;
        this.direction = null;
    }

    // Constants for directions
    static get UP() { return 3; }
    static get LEFT() { return 2; }
    static get DOWN() { return 1; }
    static get RIGHT() { return 11; }
    static get NONE() { return 4; }

    // Called at the start of each game
    init() {
        this.position = {"x": 90, "y": 120};
        this.direction = PacmanAgent.LEFT;
    }

    // Called every frame to get the next move
    // Returns: direction (UP, LEFT, DOWN, RIGHT, or NONE)
    getNextMove(gameState) {
        throw new Error("getNextMove must be implemented by the agent");
    }

    // Helper method to convert position to grid coordinates
    pointToCoord(x) {
        return Math.round(x / 10);
    }

    // Helper method to check if position is on a grid square
    onGridSquare(pos) {
        return pos.x % 10 === 0 && pos.y % 10 === 0;
    }
}

// Example Random Agent Implementation
class RandomAgent extends PacmanAgent {
    constructor(game, map) {
        super(game, map);
    }

    getNextMove(gameState) {
        // Simple random movement
        const possibleMoves = [
            PacmanAgent.UP,
            PacmanAgent.LEFT,
            PacmanAgent.DOWN,
            PacmanAgent.RIGHT
        ];

        // Filter valid moves (no walls)
        const validMoves = possibleMoves.filter(move => {
            const nextPos = this.getNextPosition(move);
            return !this.map.isWallSpace({
                y: this.pointToCoord(nextPos.y),
                x: this.pointToCoord(nextPos.x)
            });
        });

        // Return random valid move or NONE if no valid moves
        return validMoves.length > 0 ? 
            validMoves[Math.floor(Math.random() * validMoves.length)] : 
            PacmanAgent.NONE;
    }

    getNextPosition(direction) {
        const speed = 2;
        const xSpeed = (direction === PacmanAgent.LEFT && -speed || 
                       direction === PacmanAgent.RIGHT && speed || 0);
        const ySpeed = (direction === PacmanAgent.DOWN && speed || 
                       direction === PacmanAgent.UP && -speed || 0);
        
        return {
            x: this.position.x + xSpeed,
            y: this.position.y + ySpeed
        };
    }
} 