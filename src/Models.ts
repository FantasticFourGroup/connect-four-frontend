export type Player = 1 | 2;

export type GameState = "Playing" | "Win" | "Lose" | "Draw";

export interface GameStatus {
    aiHasMoved: boolean;
    state: GameState;
    backendLoaded: boolean;
}

export interface BackendResponse {
    choice: number;
    game_state: GameState;
}