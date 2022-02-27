import Navbar from './components/navbar/Navbar';
import Card from './components/subreddit/Card';
import Subreddit from "./components/subreddit/Subreddit";

import "./App.css";
import Sidebar from './components/sidebar/Sidebar';
import { useCallback, useRef, useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

function App() {
    let checker = useRef();
    const up = useRef()
    const [fixedContent, setFixedContent] = useState(false);

    const refElement = useCallback((node) => {
      if (checker.current) {
        checker.current.disconnect();
      }
      const options = {
        root: null,
        threshold: 0,
      };
      checker.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setFixedContent(false);
        } else {
          setFixedContent(true);
        }
      }, options);
      if (node) {
        checker.current.observe(node);
      }
    }, []);

    const goUp = () => {
      up.current.scrollIntoView({ behavior: "smooth" })
    }

  return (
    <>
      <Navbar />
      <div className='flex_column'>
        <div className='triple_grid'>
          <Sidebar innerRef={up} />
          <Subreddit />
          <div
            ref={refElement}
            ref={up}
            className='flex_column'
            style={{ height: "1px" }}
          ></div>
        </div>
      </div>
      {fixedContent && (
        <div className='go-up' data-aos='fade-up' onClick={goUp}>
          <FontAwesomeIcon icon={faCircleArrowUp} />
        </div>
      )}
    </>
  );
}

export default App;