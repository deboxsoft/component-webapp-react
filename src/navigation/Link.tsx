import * as React from 'react';
import { createURLDescriptor, joinPaths, modifyTrailingSlash, Navigation, URLDescriptor } from 'navi';
import { NavigationContext, NavigationValue } from './NavigationContext';
import { scrollToHash } from './ScrollHash';
import { StyledThemeTypeProps } from '../types';
import { LinkProps, LinkRendererProps } from './types';

export type LinkAnchorProps = LinkContext;

export const LinkContext = React.createContext<LinkContext>(undefined as any);

export interface LinkContext {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  ref: React.Ref<HTMLAnchorElement>;
  id?: string;
  lang?: string;
  rel?: string;
  tabIndex?: number;
  target?: string;
  title?: string;
  href?: string;
}

export class LinkAnchor extends React.Component<React.AnchorHTMLAttributes<HTMLAnchorElement>> {
  renderChildren = ({ onClick: onClickContext, href }: LinkContext) => {
    let handleClick: React.MouseEventHandler<HTMLAnchorElement> = onClickContext;
    const { onClick, ...attribs } = this.props;
    if (onClick) {
      handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        onClick && onClick(e);
        if (!e.defaultPrevented) {
          onClickContext(e);
        }
      };
    }
    // eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    return <a href={href} {...attribs} onClick={handleClick} />;
  };

  render() {
    return <LinkContext.Consumer>{this.renderChildren}</LinkContext.Consumer>;
  }
}

// Need to include this type definition, as the automatically generated one
// is incompatible with some versions of the react typings.
export const Link:
  | (React.ComponentClass<LinkProps & React.ClassAttributes<HTMLAnchorElement>> & {
      Anchor: typeof LinkAnchor;
    })
  | (React.StatelessComponent<LinkProps & React.ClassAttributes<HTMLAnchorElement>> & {
      Anchor: typeof LinkAnchor;
    }) = Object.assign(
  React.forwardRef((props: LinkProps, anchorRef: React.Ref<HTMLAnchorElement>) => (
    <NavigationContext.Consumer>
      {context => <InnerLink {...(props as any)} context={context} anchorRef={anchorRef} />}
    </NavigationContext.Consumer>
  )),
  { Anchor: LinkAnchor }
);

Link.defaultProps = {
  render: (props: LinkRendererProps) => {
    const { active, activeClassName, activeStyle, children, className, hidden, style } = props;

    return (
      <LinkAnchor
        className={`${className || ''} ${(active && activeClassName) || ''}`}
        hidden={hidden}
        style={Object.assign({}, style, active ? activeStyle : {})}
      >
        {children}
      </LinkAnchor>
    );
  }
};

interface InnerLinkProps extends LinkProps {
  context: NavigationValue;
  anchorRef: React.Ref<HTMLAnchorElement>;
}

class InnerLink extends React.Component<InnerLinkProps> {
  navigation: Navigation;

  constructor(props: InnerLinkProps) {
    super(props);

    const url = this.getURL();
    const { navigation } = props.context;
    if (navigation && url && url.pathname && props.prefetch) {
      navigation.prefetch(url).catch(e => {
        // eslint-disable-next-line no-console
        console.warn(
          `A <Link> tried to prefetch "${url && url.pathname}", but the ` +
            `router was unable to fetch this path.`
        );
      });
    }
  }

  getNavigationURL() {
    const { context } = this.props;
    const route = context.steadyRoute || context.busyRoute;
    return route && route.url;
  }

  getURL(): URLDescriptor | undefined {
    let { href } = this.props;

    // If this is an external link, return undefined so that the native
    // response will be used.
    if (
      !href ||
      (typeof href === 'string' && (href.indexOf('://') !== -1 || href.indexOf('mailto:') === 0))
    ) {
      return;
    }

    // Resolve relative to the current "directory"
    const navigationURL = this.getNavigationURL();
    if (navigationURL && typeof href === 'string') {
      href = href[0] === '/' ? href : joinPaths('/', navigationURL.pathname, href);
    }

    return createURLDescriptor(href);
  }

  handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle the event directly if:
    // - The user used the middle/right mouse button
    // - The user was holding a modifier key
    // - A `target` property is set (which may cause the browser to open the
    //   link in another tab)
    if (event.button === 0 && !(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)) {
      const { onClick, target, context, disabled } = this.props;
      if (disabled) {
        event.preventDefault();
        return;
      }

      if (onClick) {
        onClick(event);
      }

      // Let the browser handle targets natively
      if (target) {
        return;
      }

      const url = this.getURL();
      if (!event.defaultPrevented && url) {
        event.preventDefault();

        const currentURL: URLDescriptor = (context.busyRoute && context.busyRoute.url) ||
          (context.steadyRoute && context.steadyRoute.url) || {
            pathname: '',
            search: '',
            hash: '',
            query: {},
            hostname: '',
            href: ''
          };
        const isSamePathname =
          modifyTrailingSlash(url.pathname, 'remove') ===
          modifyTrailingSlash((currentURL && currentURL.pathname) || '', 'remove');
        const route = context.navigation.navigate(url);
        if ((isSamePathname || url.pathname === '') && url.hash === currentURL.hash && url.hash) {
          scrollToHash(currentURL && currentURL.hash, 'smooth');
        }
      }
    }
  };

  render() {
    const {
      activeStyle,
      activeClassName,
      anchorRef,
      onClick,
      prefetch,
      render,
      exact,
      ...props
    } = this.props;
    let { active } = this.props;
    const navigationURL = this.getNavigationURL();
    const linkURL = this.getURL();
    active =
      active !== undefined
        ? active
        : !!(
            linkURL &&
            navigationURL &&
            (exact
              ? linkURL.pathname === navigationURL.pathname
              : modifyTrailingSlash(navigationURL.pathname, 'add').indexOf(linkURL.pathname) === 0)
          );

    const context = {
      ...props,
      onClick: this.handleClick,
      ref: anchorRef,
      href: typeof props.href === 'string' ? props.href : linkURL ? linkURL.href : ''
    };

    return (
      <LinkContext.Provider value={context}>
        {render &&
          render({
            active,
            activeClassName,
            activeStyle,
            anchorProps: context,
            children: props.children,
            className: props.className,
            disabled: props.disabled,
            tabIndex: props.tabIndex,
            hidden: props.hidden,
            href: linkURL ? linkURL.href : (props.href as string),
            id: props.id,
            lang: props.lang,
            style: props.style,
            target: props.target,
            title: props.title,
            onClick: this.handleClick
          })}
      </LinkContext.Provider>
    );
  }
}
