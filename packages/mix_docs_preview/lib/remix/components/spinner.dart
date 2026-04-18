/// RemixSpinner Example
///
/// Fortal spinners in three sizes.

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(FortalScope(child: const Example()));
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
        RemixSpinner(style: FortalSpinnerStyles.base(size: .size1)),
        RemixSpinner(style: FortalSpinnerStyles.base(size: .size2)),
        RemixSpinner(style: FortalSpinnerStyles.base(size: .size3)),
      ],
    );
  }
}
