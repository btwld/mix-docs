/// RemixProgress Example
///
/// Fortal progress bar.

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
    return SizedBox(
      width: 300,
      child: RemixProgress(value: 0.3, style: FortalProgressStyles.surface()),
    );
  }
}
