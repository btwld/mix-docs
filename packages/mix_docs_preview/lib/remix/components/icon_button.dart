/// RemixIconButton Example
///
/// Icon-only buttons including a loading variant with a spinner.
/// Inspired by Github — https://primer.style/product/components/icon-button/

library;

import 'package:flutter/cupertino.dart';
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
        RemixIconButton(
          icon: CupertinoIcons.heart,
          onPressed: () {},
          style: style,
        ),
        RemixIconButton(
          icon: CupertinoIcons.heart,
          onPressed: () {},
          style: style,
          loading: true,
        ),
      ],
    );
  }

  RemixIconButtonStyle get style {
    return RemixIconButtonStyle()
        .iconColor(Colors.blueGrey.shade700)
        .iconSize(22)
        .size(40, 40)
        .color(Colors.blueGrey.shade50.withValues(alpha: 0.6))
        .borderAll(color: Colors.blueGrey.shade100, width: 1.5)
        .borderRadiusAll(const Radius.circular(8))
        .spinner(
          RemixSpinnerStyle()
              .size(22)
              .strokeWidth(1.3)
              .indicatorColor(Colors.blueGrey.shade600),
        )
        .onHovered(
          RemixIconButtonStyle()
              .color(Colors.blueGrey.shade100.withValues(alpha: 0.4)),
        )
        .onPressed(
          RemixIconButtonStyle()
              .color(Colors.blueGrey.shade100.withValues(alpha: 0.8)),
        );
  }
}
