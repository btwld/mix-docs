/// RemixProgress Example
///
/// Rounded progress bar with a dark indicator on a light track.
/// Inspired by shadcn — https://ui.shadcn.com/docs/components/progress

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
    return RemixProgress(value: 0.3, style: style);
  }

  RemixProgressStyle get style {
    return RemixProgressStyle()
        .wrap(WidgetModifierConfig.clipRRect(borderRadius: .circular(10)))
        .trackColor(Colors.grey.shade300)
        .indicatorColor(Colors.grey.shade900)
        .width(300)
        .height(10);
  }
}
