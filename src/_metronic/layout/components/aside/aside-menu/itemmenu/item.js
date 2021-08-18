/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../../_helpers";
import { useLang, setLanguage } from './../../../../../i18n'

export function Items2({ parent, child, layoutProps }) {
    const [lang, setLang] = React.useState(useLang())
    const location = useLocation();
    const getMenuItemActive = (url, hasSubmenu = false) => {
        return checkIsActive(location, url)
            ? ` ${!hasSubmenu &&
            "menu-item-active"} menu-item-open menu-item-not-hightlighted`
            : "";
    };

    return (
        child.map((val, key) => {
         
            return (
                <ul key={key}>
                    <li className="menu-item  menu-item-parent" aria-haspopup="true">
                        <span className="menu-link">
                            <span className="menu-text menu-text-h">{val.parent[lang]}</span>
                        </span>
                    </li>
                    <li
                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                            `/${val.parent[lang]}`,
                            true
                        )}`}
                        aria-haspopup="true"
                        data-menu-toggle="hover"
                    >
                        {
                            val.child.length > 0
                                ?
                                <div
                                    className="menu-link menu-toggle"
                                    to={val.to}
                                >
                                    <div key={key}
                                        className={`menu-item menu-item-submenu ${getMenuItemActive(
                                            `/${parent.parent[lang]}`,
                                            true
                                        )}`}
                                        aria-haspopup="true"
                                        data-menu-toggle="hover">
                                        <div key={key} className="menu-link menu-toggle" to={val.to}>
                                            <i className={`menu-bullet ${val.icon}`}>
                                                <span />
                                            </i>
                                            <span className="menu-text menu-text-h">{val.parent[lang]}</span>
                                            <i className="menu-arrow" />
                                        </div>
                                        <div className="menu-submenu" >
                                            <Items2 parent={val} child={val.child} layoutProps={layoutProps} />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div
                                    className="menu-link menu-toggle"
                                    to={val.to}
                                >
                                    <React.Fragment>
                                        <i className={`menu-bullet ${val.icon}`}>
                                            <span />
                                        </i>
                                        <span className="menu-text menu-text-h">{val.parent[lang]}</span>
                                    </React.Fragment>
                                </div>

                        }

                    </li>
                </ul>

            )
        })
    )
}

export function Items1({ parent, child, layoutProps }) {
    const [lang, setLang] = React.useState(useLang())
    const location = useLocation();
    const getMenuItemActive = (url, hasSubmenu = false) => {
        return checkIsActive(location, url)
            ? ` ${!hasSubmenu &&
            "menu-item-active"} menu-item-open menu-item-not-hightlighted`
            : "";
    };

    return (
        child.map((val, key) => {
            return (
                <div key={key}
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                        `/${parent.parent[lang]}`,
                        true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover">                       
                    <div key={key} className="menu-link menu-toggle" to={val.to}>
                        <i className={`menu-bullet ${val.icon}`}>
                            <span />
                        </i>
                        <span className="menu-text menu-text-h">{parent.parent[lang]}</span>
                        <i className="menu-arrow" />
                    </div>
                    <div className="menu-submenu" >
                        <ul className="menu-subnav">
                            <li className="menu-item  menu-item-parent" aria-haspopup="true">
                                <span className="menu-link">
                                    <span className="menu-text menu-text-h">{val.parent[lang]}</span>
                                </span>
                            </li>
                            <li
                                className={`menu-item menu-item-submenu ${getMenuItemActive(
                                    `/${val.parent[lang]}`,
                                    true
                                )}`}
                                aria-haspopup="true"
                                data-menu-toggle="hover"
                            >
                                {
                                    val.child.length > 0
                                        ?
                                        <div
                                            className="menu-link menu-toggle"
                                            to={val.to}
                                        >
                                            <div key={key}
                                                className={`menu-item menu-item-submenu ${getMenuItemActive(
                                                    `/${parent.parent[lang]}`,
                                                    true
                                                )}`}
                                                aria-haspopup="true"
                                                data-menu-toggle="hover">
                                                <div key={key} className="menu-link menu-toggle" to={val.to}>
                                                    <i className={`menu-bullet ${val.icon}`}>
                                                        <span />
                                                    </i>
                                                    <span className="menu-text menu-text-h">{val.parent[lang]}</span>
                                                    <i className="menu-arrow" />
                                                </div>
                                                <div className="menu-submenu" >
                                                    <Items2 parent={val} child={val.child} layoutProps={layoutProps} />
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div
                                            className="menu-link menu-toggle"
                                            to={val.to}
                                        >
                                            <React.Fragment>
                                                <i className={`menu-bullet ${val.icon}`}>
                                                    <span />
                                                </i>
                                                <span className="menu-text menu-text-h">{val.parent[lang]}</span>
                                            </React.Fragment>
                                        </div>

                                }

                            </li>
                        </ul>
                    </div>
                </div>

            )
        })
    )
}
export function Items({ item, layoutProps }) {
    const [lang, setLang] = React.useState(useLang())
    const location = useLocation();
    const getMenuItemActive = (url, hasSubmenu = false) => {
        return checkIsActive(location, url)
            ? ` ${!hasSubmenu &&
            "menu-item-active"} menu-item-open menu-item-not-hightlighted`
            : "";
    };

    return (
        item.map((val, key) => {

            return (
                <li key={key}
                    className={`menu-item menu-item-submenu ${getMenuItemActive(
                        `/${val.parent[lang]}`,
                        true
                    )}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover">
                    <NavLink className="menu-link menu-toggle" to={val.to}>
                        <span className="svg-icon menu-icon">
                            <SVG src={toAbsoluteUrl(val.icon)} />
                        </span>
                        <span className="menu-text ">{val.parent[lang]}</span>
                        {
                            val.child.length > 0 ? <i className="menu-arrow" /> :''
                        }
                        
                    </NavLink>
                    <React.Fragment key={key}>
                        {
                            (val.child.length > 0
                                ?
                                <div className="menu-submenu">
                                    
                                    <i className="menu-arrow" />
                                    <ul className="menu-subnav">
                                        <li className="menu-item  menu-item-parent" aria-haspopup="true">
                                            <span className="menu-link">
                                                <span className="menu-text menu-text-h">{val.parent[lang]}</span>
                                            </span>
                                        </li>
                                        <li
                                            className={`menu-item menu-item-submenu ${getMenuItemActive(
                                                `/${val.parent[lang]}`,
                                                true
                                            )}`}
                                            aria-haspopup="true"
                                            data-menu-toggle="hover"
                                        >
                                            {/* menu sum menu 1 */}
                                            {

                                                val.child.map((val, key) => {
                                                    return (
                                                        <React.Fragment key={key}>
                                                            <NavLink
                                                                className="menu-link menu-toggle"
                                                                to={val.to}
                                                            >
                                                                {
                                                                    val.child.length > 0
                                                                        ?
                                                                        <React.Fragment>
                                                                            <Items1 parent={val} child={val.child} layoutProps={layoutProps} />
                                                                        </React.Fragment>
                                                                        :
                                                                        <React.Fragment>
                                                                            <i className={`menu-bullet ${val.icon}`}>
                                                                                <span />
                                                                            </i>
                                                                            <span className="menu-text menu-text-h">{val.parent[lang]}</span>
                                                                        </React.Fragment>
                                                                }
                                                            </NavLink>
                                                        </React.Fragment>

                                                    )
                                                })
                                            }
                                        </li>
                                    </ul>
                                </div>
                                :
                                '')
                        }
                    </React.Fragment>

                </li>
                //  ....................................................
            )
        })
    )
}