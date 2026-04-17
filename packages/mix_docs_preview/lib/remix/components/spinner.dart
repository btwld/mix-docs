/// RemixSpinner Example
///
/// Three spinners: default, with track, and custom color with slower duration.

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
        RemixSpinner(style: styleDefault),
        RemixSpinner(style: styleWithTrack),
        RemixSpinner(style: styleCustomColors),
      ],
    );
  }

  RemixSpinnerStyle get styleDefault {
    return RemixSpinnerStyle().indicatorColor(Colors.blue);
  }

  RemixSpinnerStyle get styleWithTrack {
    return RemixSpinnerStyle()
        .indicatorColor(Colors.green)
        .trackColor(Colors.green.withValues(alpha: 0.2));
  }

  RemixSpinnerStyle get styleCustomColors {
    return RemixSpinnerStyle()
        .indicatorColor(Colors.redAccent)
        .trackColor(Colors.red.withValues(alpha: 0.15))
        .duration(2.s);
  }
}
