export type Player = 1 | 2;

export type GameState = "Playing" | "Win" | "Lose" | "Draw";

export type Depth = 4 | 5 | 6 | 7

export interface GameStatus {
    aiHasMoved: boolean;
    state: GameState;
    backendLoaded: boolean;
    depth: Depth
}

export interface BackendResponse {
    choice: number;
    game_state: GameState;
}