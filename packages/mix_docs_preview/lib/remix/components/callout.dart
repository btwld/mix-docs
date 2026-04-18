/// RemixCallout Example
///
/// Informational callout with a filled icon slot on the left.
/// Inspired by design.alberta.ca — https://design.alberta.ca/components/callout

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
    return RemixCallout(
      text: 'Callout important information for the user.',
      icon: Icons.info_outline,
      style: style,
    );
  }

  RemixCalloutStyle get style {
    return RemixCalloutStyle()
        .backgroundColor(Colors.grey.shade200)
        .spacing(12)
        .height(60)
        .paddingRight(12)
        .icon(
          IconStyler()
              .size(24)
              .color(Colors.white)
              .wrap(
                .box(
                  BoxStyler()
                      .color(Colors.blue.shade900)
                      .paddingX(12)
                      .height(.infinity),
                ),
              ),
        )
        .mainAxisSize(.min);
  }
}
