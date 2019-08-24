import React from 'react';
// import easeInOutCubic from 'helper/ease';
// import anime from 'animejs/lib/anime.es.js';

import Header from 'components/header';
// import Raycasting from 'components/section_raycasting';
// import Astar from 'components/section_astar';
// import BFS from 'components/section_bfs';
// import Maze from 'components/section_maze';
// import Z from 'components/sections_zens';
// import Pop from 'components/section_tobenottobe';
import Pixi from 'components/section_pixi';

import Parallex from 'components/section_parallex';
import Parallex2 from 'components/section_parallex2';



class App extends React.PureComponent {
  


  render () {
    return (
      <div className="App">
        <Header></Header>
        <div className="contents">
          {/* <Z></Z> */}
          
          {/* <Pop></Pop> */}
          {/* <Raycasting></Raycasting> */}
          {/* <Maze></Maze> */}
          {/* <Astar></Astar> */}
          {/* <BFS></BFS> */}
          <Parallex />
          <Parallex2 />
          <Pixi></Pixi>
          {/* <section></section>
          <section><div></div></section>
          <section><div></div></section> */}
          <footer>
            <p>网站建设中...</p>
          </footer>
        </div>
      </div>
    );
  }
  
}

export default App;
