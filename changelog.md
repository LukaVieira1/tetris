# Changelog

## [0.1.0] - 2024-12-24

### Added

- Initial Tetris game implementation
- Basic game board with 10x20 grid
- Piece movement controls:
  - Left/Right arrow keys for horizontal movement
  - Down arrow for soft drop
  - Space bar for hard drop
  - Up arrow for piece rotation
- Collision detection system
- Line clearing mechanics
- Random piece generation
- Real-time piece preview on board

### Technical Details

- Built with React 18 and TypeScript
- Tailwind CSS for styling
- Vite as build tool
- ESLint for code quality
- Component-based architecture
- Game state management with React hooks

## [0.2.0] - 2024-12-25

### Added

- Game over modal
- Reset game button

## [0.2.1] - 2024-12-26

### Fixed

- Fixed UI bugs
  - Fixes game modal position
  - Fixes game board size
  - Fixes game board position
  - Fixes pieces separation
- Fixex getRandomPiece function, now it returns a random rotation of the piece
