/// RemixBadge Example
///
/// Two circular badges — one with a number label, one with an icon.
/// Inspired by line — https://designsystem.line.me/LDSG/components/indicators/badge-en

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
        RemixBadge(label: '8', style: styleLabel),
        RemixBadge(style: styleIcon, child: const Icon(Icons.camera_alt)),
      ],
    );
  }

  RemixBadgeStyle get styleLabel {
    return RemixBadgeStyle()
        .size(24, 24)
        .wrap(WidgetModifierConfig.clipOval())
        .label(
          TextStyler()
              .fontSize(15)
              .wrap(WidgetModifierConfig.align(alignment: .center))
              .fontFeatures([const FontFeature.tabularFigures()]),
        )
        .foregroundColor(Colors.greenAccent.shade700)
        .labelColor(Colors.white)
        .labelFontWeight(FontWeight.bold)
        .labelFontSize(15);
  }

  RemixBadgeStyle get styleIcon {
    return RemixBadgeStyle()
        .size(24, 24)
        .wrap(WidgetModifierConfig.clipOval())
        .label(
          TextStyler()
              .fontSize(15)
              .wrap(WidgetModifierConfig.align(alignment: .center))
              .fontFeatures([const FontFeature.tabularFigures()]),
        )
        .foregroundColor(Colors.redAccent)
        .wrap(.iconTheme(color: Colors.white, size: 15));
  }
}
