/// RemixCard Example
///
/// Fortal card in the surface variant.

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
    return RemixCard(
      style: FortalCardStyles.surface(),
      child: const SizedBox(width: 280, height: 160),
    );
  }
}
