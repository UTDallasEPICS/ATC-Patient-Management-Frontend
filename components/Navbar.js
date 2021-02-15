import PropTypes from "prop-types";
import styles from "../styles/Navbar.module.css";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TransitionGroup } from "react-transition-group";


const Navbar = ({ pageTitle }) => {
  const [collapsed, setCollapsed] = useState(true);

  const accordionClick = (e) => {
    let button = e.target;
    if (button instanceof HTMLLIElement) {
      button = e.target.parentElement;
    }

    if (button instanceof SVGSVGElement) {
      button = e.target.parentElement.parentElement;
    }

    if (button instanceof SVGPathElement) {
      button = e.target.parentElement.parentElement.parentElement;
    }

    console.log("e.target: " + e.target);

    let content = button.nextElementSibling;

    console.log("content: " + content);

    // content.classList.toggle()
    if (content.style.display === "block") {
      setCollapsed(true);
      content.style.display = "none";
      //   content.classList.add(styles.hiddenContent);
      //   content.classList.remove(styles.showingContent);
    } else {
      setCollapsed(false);
      content.style.display = "block";
      //   content.classList.remove(styles.hiddenContent);
      //   content.classList.add(styles.showingContent);
    }
  };

  const windowSize = useWindowSize();

  return (
    <div className={styles.banner}>
      <div className={styles.menuToggle}>
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>

        <ul className={styles.menu} style={{height: windowSize.height}}>
          <button
            onClick={accordionClick}
            type="button"
            className={styles.collapsible}
          >
            <li className={styles.link}>
              Students{" "}
              {collapsed ? (
                <AiFillCaretDown className={styles.caret} />
              ) : (
                <AiFillCaretUp className={styles.caret} />
              )}
            </li>
          </button>
          <div className={styles.content}>
            <ul className={styles.indentedMenu}>
              <Link href="/studentSearch">
                <li className={styles.link}>Search</li>
              </Link>
              <Link href="/newStudent">
                <li className={styles.link}>Add new</li>
              </Link>
            </ul>
          </div>

          <Link href="/">
            <li className={styles.link}>Schedule</li>
          </Link>
          <Link href="/">
            <li className={styles.link}>Logout</li>
          </Link>
        </ul>
      </div>

      <h1 className={styles.pageTitle}>{pageTitle}</h1>
    </div>
  );
};

// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== 'undefined') {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
      
        // Add event listener
        window.addEventListener("resize", handleResize);
       
        // Call handler right away so state gets updated with initial window size
        handleResize();
      
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

Navbar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Navbar;
