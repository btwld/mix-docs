/// RemixAvatar Example
///
/// Three avatar styles — initials, icon, and image.
/// Inspired by gov.br — https://www.gov.br/ds/components/avatar

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(const Example());
}

class Example extends StatelessWidget {
  const Example({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: .center,
      mainAxisSize: .min,
      spacing: 16,
      children: [
        RemixAvatar(label: 'LF', style: labelStyle),
        RemixAvatar(icon: Icons.person, style: iconStyle),
        RemixAvatar(style: image),
      ],
    );
  }

  RemixAvatarStyle get labelStyle {
    return RemixAvatarStyle()
        .textColor(Colors.deepPurpleAccent)
        .size(50, 50)
        .shapeCircle()
        .wrap(WidgetModifierConfig.clipOval())
        .labelColor(Colors.white)
        .labelFontWeight(FontWeight.bold)
        .labelFontSize(15);
  }

  RemixAvatarStyle get iconStyle {
    return RemixAvatarStyle()
        .textColor(Colors.deepOrangeAccent)
        .size(70, 70)
        .iconColor(Colors.white)
        .iconSize(70)
        .icon(IconStyler().wrap(WidgetModifierConfig.translate(x: 0, y: 12)))
        .shapeCircle()
        .wrap(WidgetModifierConfig.clipOval());
  }

  RemixAvatarStyle get image {
    return RemixAvatarStyle()
        .size(90, 90)
        .backgroundImageUrl('https://i.pravatar.cc/150?img=48')
        .shapeCircle();
  }
}
