import PropTypes from "prop-types";
import styles from "../styles/Navbar.module.css";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";

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

  return (
    <div className={styles.banner}>
      <div className={styles.menuToggle}>
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>

        <ul className={styles.menu}>
          {/* <Link href="/">
            <li className={styles.link}>Students</li>
          </Link> */}

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
              <Link href="/">
                <li className={styles.link}>Search</li>
              </Link>
              <Link href="/">
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

Navbar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Navbar;
