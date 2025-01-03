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

## [0.3.0] - 2024-12-27

### Added

- Score board
  - Top 3 scores saved in local storage and shown in score board
- Game level
  - Show actual level
  - Show actual lines cleared
  - Show actual score
  - Level up when 5 lines \* level are cleared
  - Speed up at 100ms when level up

## [0.3.1] - 2024-12-29

### Fixed

- Fixed game board size
- Fixed game board position
- Fixed pieces vertical position
- Fixed pieces horizontal start position and game over condition for the new start
- Fixed pieces dont fall when moving or rotating

## [0.4.0] - 2024-12-29

### Added

- Pause game option

  - Pause game if pressed p
  - Resume game if pressed p
  - Pause game when click outside the game

- Pause game modal

  - Show pause game modal
  - Resume game if pressed p
  - Resume game if click continue

- Shadow piece

  - Shadow piece is a preview to where the piece will fall

- Next pieces
  - Show the next 3 pieces

## [0.4.1] - 2024-12-30

### Fixed

- Reset all game states when reset game

## [0.5.0] - 2024-12-31

### Added

- New Game UI
- Game over modal
- Game Board
- Score Board
- Next Pieces
- Pause Game modal
- Leveling

- Clear lines animations
  - Added framer motion to clear lines animations

## [1.0.0] - 2025-01-02

This is the first stable version of the game. Future updates will be focused on improving the game and adding new features. This future features includes: game sounds, points when pressed space or key down, better animations, and more.

### Added

- Intro animation

- Menu page

  - How to play page
  - Game page

- Multi language support

  - i18n for translations
  - Language detector
  - Language change

- Back to menu button

- README.md

## [1.1.0] - 2025-01-02

### Added

- Points per line dropped
  - 1 point per soft drop (arrow down)
  - 2 points per each line in hard drop (space)
  - added explanation in how to play page

## [1.2.0] - 2025-01-03

### Added

- Cypress tests
  - Added e2e tests for the game
  - Added e2e tests for the menu
