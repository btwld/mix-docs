/// RemixDivider Example
///
/// A horizontal divider with custom thickness, color, and width.

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
    final style = RemixDividerStyle()
        .height(1)
        .width(300)
        .color(Colors.grey.shade400);

    return RemixDivider(style: style);
  }
}
