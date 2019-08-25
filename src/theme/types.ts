import { Size, Position, Color, LinkColor, ThemeAllType, ThemeType, Font } from '../utils/types';
import * as button from '../button/types';
import * as card from '../card/types';
import * as navbar from '../navbar/types';
import * as navigation from '../navigation/types';
import * as layout from '../layout/types';
import * as form from '../form/types';
import { Type as NotifyType } from '../notify/types';
import { IconSize } from '../icon';
export interface AlertTheme {
  alert: {
    colors: ThemeAllType<LinkColor>;
    margin?: string;
    padding: {
      dismissibleRight: string;
      default: string;
    };
    font: Font<Size>;
    borderRadius: Size;
    border: Size;
  };
}
export interface BadgeTheme {
  badge: {
    colors: ThemeAllType<LinkColor>;
    padding: {
      pill?: string;
      default?: string;
    };
    font: Font<Size>;
    borderRadius: Size;
  };
}
export interface BodyTheme {
  body: {
    colors: Color;
  };
}
export interface BreadcrumbTheme {
  breadcrumb: {
    colors: ThemeType<Color>;
    padding: string;
    margin: string;
    borderRadius: Size;
  };
}
export interface IconTheme {
  icon: {
    height?: IconSize;
    width?: IconSize;
    fontSize?: IconSize;
  };
}
export interface ImageTheme {
  image?: {
    borderRadius?: string;
  };
}
export interface LinkTheme {
  link: {
    colors: LinkColor;
    hoverDecoration?: string;
    font?: Font<Size>;
  };
}
export interface ListTheme {
  list: {
    colors: ThemeType<Color>;
  };
  listHeader: {
    colors: ThemeType<Color>;
  };
  listFooter: {
    padding?: string;
    border?: Position;
  };
  listItem: {
    colors: ThemeType<LinkColor>;
  };
  listSection: {
    colors: ThemeType<Color>;
  };
}
export interface NotifyTheme {
  notify: {
    colors: NotifyType<Color>;
  };
}
export interface ModalTheme {
  modal: {};
}
export interface TableTheme {
  table: {
    colors: ThemeType<
      LinkColor & {
        head: Color;
        stripedBackgroundColor?: string;
        borderedBorderColor?: string;
      }
    >;
    border: {
      theadBottom?: string;
      tbodyTop?: string;
      top?: string;
    };
  };
  tr: {
    colors: {
      default: LinkColor;
      error: LinkColor;
      success: LinkColor;
      warning: LinkColor;
    };
  };
}
export interface TooltipTheme {
  tooltip: {};
}
export interface Theme {
  button?: button.ButtonTheme;
  buttonGroup?: button.ButtonGroupTheme;
  card?: card.CardTheme;
  cardBody?: card.CardBodyTheme;
  cardFooter?: card.CardFooterTheme;
  cardHeader?: card.CardHeaderTheme;
  cardImage?: card.CardImageTheme;
  cardTitle?: card.CardTitleTheme;
  container?: layout.ContainerTheme;
  formCheck?: form.FormCheckTheme;
  formCheckInput?: form.FormCheckInputTheme;
  formControl?: form.FormControlTheme;
  formControlPlainText?: form.FormControlPlainTextTheme;
  formControlFile?: form.FormControlFileTheme;
  formGroup?: form.FormGroupTheme;
  formText?: form.FormTextTheme;
  formInline?: form.FormInlineTheme;
  inputGroup?: form.InputGroupTheme;
  inputGroupText?: form.InputGroupTextTheme;
  inputGroupAppend?: form.InputGroupAppendTheme;
  inputGroupPrepend?: form.InputGroupPrependTheme;
  nav?: navigation.NavTheme;
  navLink?: navigation.NavLinkTheme;
  navbar?: navbar.NavbarTheme;
  navbarLink?: navbar.NavbarLinkTheme;
  grid?: layout.GridTheme;
}
