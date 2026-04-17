/// RemixCard Example
///
/// A simple bordered card container.
/// Inspired by dell — https://www.delldesignsystem.com/components/card/

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
    return RemixCard(style: style);
  }

  RemixCardStyle get style {
    return RemixCardStyle()
        .size(300, 200)
        .color(Colors.white)
        .borderRadiusAll(const Radius.circular(4))
        .borderAll(color: Colors.grey.shade300);
  }
}
