/* eslint-disable react/no-unescaped-entities, react/jsx-no-comment-textnodes -- Dart snippets intentionally render source punctuation as JSX text. */
import Link from 'next/link'
import './ack.css'

export function AckHome() {
  return (
    <main className="ack-home not-prose">
      <div className="ack-home-backdrop" aria-hidden="true">
        <div className="ack-home-grid" />
        <div className="ack-home-glow ack-home-glow-one" />
        <div className="ack-home-glow ack-home-glow-two" />
      </div>

      <section className="ack-hero ack-shell" aria-labelledby="ack-hero-title">
        <div className="ack-hero-copy">
          <div className="ack-kicker-row">
            <p className="ack-product-kicker">Dart schemas for apps &amp; structured AI</p>
            <a
              className="ack-byline"
              href="https://conceptatech.com"
              target="_blank"
              rel="noreferrer"
            >
              by
              <img src="/assets/logo_concepta.svg" alt="Concepta" />
            </a>
          </div>

          <h1 id="ack-hero-title">
            Trust the boundary.
            <span>Keep the types.</span>
          </h1>

          <p className="ack-hero-lede">
            Define the shape once. Guide structured AI output, validate every response at
            runtime, decode wire values into Dart, and generate types when you want them.
          </p>

          <div className="ack-hero-actions">
            <Link className="ack-button ack-button-primary" href="/documentation/ack/getting-started/quickstart-tutorial">
              Start validating <span aria-hidden="true">→</span>
            </Link>
            <a className="ack-button ack-button-secondary" href="https://github.com/btwld/ack">
              View on GitHub
            </a>
          </div>

          <ul className="ack-hero-notes" aria-label="Ack highlights">
            <li>Runtime-first validation</li>
            <li>Bidirectional codecs</li>
            <li>Optional code generation</li>
          </ul>
        </div>

        <div className="ack-hero-demo" aria-label="Ack validation example">
          <div className="ack-window">
            <div className="ack-window-bar">
              <div className="ack-window-context">
                <span>DART</span>
                <code>user_schema.dart</code>
              </div>
              <span className="ack-window-status"><i aria-hidden="true" /> safeParse()</span>
            </div>

            <div className="ack-code-stage">
              <div className="ack-code-label" aria-hidden="true">Schema + boundary input</div>
              <pre tabIndex={0} aria-label="Dart schema and validation code"><code>
                <span className="tok-keyword">final</span> userSchema = <span className="tok-type">Ack</span>.<span className="tok-call">object</span>({'{'}{`\n`}
                {'  '}<span className="tok-string">'name'</span>: <span className="tok-type">Ack</span>.<span className="tok-call">string</span>().<span className="tok-call">minLength</span>(<span className="tok-number">2</span>),{`\n`}
                {'  '}<span className="tok-string">'email'</span>: <span className="tok-type">Ack</span>.<span className="tok-call">string</span>().<span className="tok-call">email</span>(),{`\n`}
                {'  '}<span className="tok-string">'age'</span>: <span className="tok-type">Ack</span>.<span className="tok-call">integer</span>().<span className="tok-call">min</span>(<span className="tok-number">0</span>).<span className="tok-call">optional</span>(),{`\n`}
                {'}'});{`\n\n`}
                <span className="tok-keyword">final</span> result = userSchema.<span className="tok-call">safeParse</span>({'{'}{`\n`}
                {'  '}<span className="tok-string">'name'</span>: <span className="tok-string">'Ada'</span>,{`\n`}
                {'  '}<span className="tok-string">'email'</span>: <span className="tok-string">'not-an-email'</span>,{`\n`}
                {'}'});
              </code></pre>
            </div>

            <div className="ack-result-panel">
              <div className="ack-result-heading">
                <span><i aria-hidden="true" /> Validation failed</span>
                <span>1 issue · 0 exceptions</span>
              </div>
              <div className="ack-error-row">
                <code>#/email</code>
                <span><strong>SchemaError</strong> Value must be a valid email address.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ack-proof-strip" aria-label="Ack capabilities">
        <ul className="ack-shell">
          <li>Structured AI</li>
          <li>Runtime validation</li>
          <li>Generated types</li>
          <li>Provider adapters</li>
          <li>Bidirectional codecs</li>
        </ul>
      </section>

      <section className="ack-workflow ack-shell" aria-labelledby="ack-workflow-title">
        <header className="ack-section-heading">
          <span className="ack-eyebrow">ONE READABLE PATH</span>
          <h2 id="ack-workflow-title">From unknown input to a useful result.</h2>
          <p>
            The same schema follows your data through the entire boundary. Each step is explicit,
            inspectable, and close to the Dart code—or generated output—that consumes it.
          </p>
        </header>

        <div className="ack-story">
          <article className="ack-story-step">
            <div className="ack-story-copy">
              <span className="ack-feature-index">01 / DEFINE</span>
              <h3>Write the contract once.</h3>
              <p>
                Compose small schemas into the exact object your application accepts. Constraints
                stay beside the fields they protect.
              </p>
              <Link href="/documentation/ack/essentials/schemas">Explore schemas <span aria-hidden="true">→</span></Link>
            </div>
            <div className="ack-example-panel">
              <div className="ack-example-meta"><span>user_schema.dart</span><span>CONTRACT</span></div>
              <pre tabIndex={0} aria-label="Define a user schema"><code><span className="tok-keyword">final</span> userSchema = <span className="tok-type">Ack</span>.<span className="tok-call">object</span>({'{'}{`\n`}  <span className="tok-string">'name'</span>: <span className="tok-type">Ack</span>.<span className="tok-call">string</span>().<span className="tok-call">minLength</span>(<span className="tok-number">2</span>),{`\n`}  <span className="tok-string">'email'</span>: <span className="tok-type">Ack</span>.<span className="tok-call">string</span>().<span className="tok-call">email</span>(),{`\n`}  <span className="tok-string">'createdAt'</span>: <span className="tok-type">Ack</span>.<span className="tok-call">datetime</span>(),{`\n`}{'}'});</code></pre>
            </div>
          </article>

          <article className="ack-story-step">
            <div className="ack-story-copy">
              <span className="ack-feature-index">02 / VALIDATE</span>
              <h3>Check data where it enters.</h3>
              <p>
                Use <code>safeParse</code> at an API, form, storage, or AI boundary. The result makes
                success and failure deliberate—without a required try/catch.
              </p>
              <Link href="/documentation/ack/essentials/validation">Choose a parsing strategy <span aria-hidden="true">→</span></Link>
            </div>
            <div className="ack-example-panel ack-validation-panel">
              <div className="ack-example-meta"><span>incoming payload</span><span>UNKNOWN → CHECKED</span></div>
              <pre tabIndex={0} aria-label="Validate an incoming payload"><code><span className="tok-keyword">final</span> result = userSchema{`\n`}    .<span className="tok-call">safeParse</span>(request.body);{`\n\n`}<span className="tok-keyword">if</span> (result.isFail) {'{'}{`\n`}  logger.warn(result.<span className="tok-call">getError</span>());{`\n`}{'}'}</code></pre>
              <div className="ack-validation-trace" aria-label="Data validation trace">
                <div className="ack-trace-step">
                  <span className="ack-trace-index">01</span>
                  <small>BOUNDARY VALUE</small>
                  <code><span className="tok-type">Object?</span></code>
                </div>
                <div className="ack-trace-step is-active">
                  <span className="ack-trace-index">02</span>
                  <small>RUN THE SCHEMA</small>
                  <code><span className="tok-call">safeParse</span>()</code>
                </div>
                <div className="ack-trace-step">
                  <span className="ack-trace-index">03</span>
                  <small>TYPED OUTCOME</small>
                  <code><span className="tok-type">SchemaResult</span></code>
                </div>
              </div>
            </div>
          </article>

          <article className="ack-story-step">
            <div className="ack-story-copy">
              <span className="ack-feature-index">03 / USE THE RESULT</span>
              <h3>Handle both outcomes with context.</h3>
              <p>
                Consume the validated value or route a structured error. Every failure preserves
                the path and reason your UI, logs, or API response needs.
              </p>
              <Link href="/documentation/ack/essentials/error-handling">Work with SchemaResult <span aria-hidden="true">→</span></Link>
            </div>
            <div className="ack-outcome-panel">
              <div className="ack-outcome is-success">
                <div><span>OK</span><code>result.getOrThrow()</code></div>
                <strong>Validated map</strong>
                <p>Only the shape you described moves forward.</p>
              </div>
              <div className="ack-outcome is-failure">
                <div><span>FAIL</span><code>result.getError()</code></div>
                <strong>SchemaError</strong>
                <p><code>#/email</code> pinpoints the invalid field.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="ack-extensions ack-shell" aria-labelledby="ack-extensions-title">
        <header className="ack-section-heading ack-section-heading-wide">
          <div>
            <span className="ack-eyebrow">ONE SCHEMA, EVERY AI BOUNDARY</span>
            <h2 id="ack-extensions-title">Built for structured AI. Grounded in runtime validation.</h2>
          </div>
          <p>
            Use one Ack schema to guide generation, verify model output, recover rich Dart
            values, and adapt the contract to the provider you use.
          </p>
        </header>

        <div className="ack-extension-grid">
          <article className="ack-feature-card ack-feature-ai">
            <div className="ack-feature-copy">
              <span className="ack-feature-index">Firebase AI / Gemini</span>
              <h3>Guide generation. Then verify it.</h3>
              <p>
                The shipped Firebase AI adapter turns your Ack schema into
                <code> responseJsonSchema</code>. After generation, the same schema remains the
                authoritative runtime validator and codec boundary.
              </p>
              <Link href="/documentation/ack/advanced/json-schema-integration">Explore structured output <span aria-hidden="true">→</span></Link>
            </div>
            <div className="ack-mini-code ack-ai-code">
              <div className="ack-example-meta"><span>structured_output.dart</span><span>GUIDE → GENERATE → VERIFY</span></div>
              <pre tabIndex={0} aria-label="Guide and validate Firebase AI structured output"><code><span className="tok-keyword">final</span> responseSchema = <span className="tok-type">Ack</span>.<span className="tok-call">object</span>({'{'}{`\n`}  <span className="tok-string">'answer'</span>: <span className="tok-type">Ack</span>.<span className="tok-call">string</span>(),{`\n`}  <span className="tok-string">'sources'</span>: <span className="tok-type">Ack</span>.<span className="tok-call">list</span>(<span className="tok-type">Ack</span>.<span className="tok-call">uri</span>()),{`\n`}  <span className="tok-string">'generatedAt'</span>: <span className="tok-type">Ack</span>.<span className="tok-call">datetime</span>(),{`\n`}{'}'});{`\n\n`}<span className="tok-keyword">final</span> config = <span className="tok-type">GenerationConfig</span>({`\n`}  responseJsonSchema:{`\n`}    responseSchema.<span className="tok-call">toFirebaseAiResponseJsonSchema</span>(),{`\n`});{`\n\n`}<span className="tok-keyword">final</span> output = responseSchema.<span className="tok-call">parse</span>({`\n`}  jsonDecode(response.text!),{`\n`});</code></pre>
            </div>
          </article>

          <article className="ack-feature-card ack-feature-adapters">
            <div className="ack-feature-copy">
              <span className="ack-feature-index">PROVIDER ADAPTERS</span>
              <h3>One model. Provider-specific output.</h3>
              <p>
                <code>AckSchemaModel</code> is the target-independent adapter boundary. Use the
                built-in <code>toJsonSchema()</code> path, the Firebase AI adapter, or author a
                focused adapter for OpenAI and other provider SDKs.
              </p>
              <Link href="/documentation/ack/advanced/schema-converter-quickstart">Build a provider adapter <span aria-hidden="true">→</span></Link>
            </div>
            <div className="ack-provider-flow" aria-label="Ack provider adapter paths">
              <div className="ack-provider-source"><small>CANONICAL MODEL</small><code>AckSchemaModel</code></div>
              <div className="ack-provider-targets">
                <div><span>SHIPPED</span><strong>Firebase AI</strong></div>
                <div><span>BUILT IN</span><strong>JSON Schema</strong></div>
                <div className="is-extensible"><span>EXTEND</span><strong>Your provider adapter</strong></div>
              </div>
            </div>
          </article>

          <article className="ack-feature-card ack-feature-types">
            <div className="ack-feature-copy">
              <span className="ack-feature-index">TYPE-SAFE CODE GENERATION</span>
              <h3>Generate types, not duplicate models.</h3>
              <p>Annotate the schema you already trust. Ack generates a lightweight wrapper with typed getters and parse helpers—without changing the runtime schema.</p>
              <Link href="/documentation/ack/advanced/typesafe-schemas">Generate typed schemas <span aria-hidden="true">→</span></Link>
            </div>
            <div className="ack-mini-code">
              <div className="ack-example-meta"><span>user_schema.dart</span><span>OPTIONAL GENERATOR</span></div>
              <pre tabIndex={0} aria-label="Generate typed accessors"><code><span className="tok-annotation">@AckType</span>(){`\n`}<span className="tok-keyword">final</span> userSchema = <span className="tok-type">Ack</span>.<span className="tok-call">object</span>(...);{`\n\n`}<span className="tok-keyword">final</span> ada = UserType.<span className="tok-call">parse</span>(json);{`\n`}print(ada.email); <span className="tok-comment">// String</span></code></pre>
            </div>
          </article>

          <article className="ack-feature-card ack-feature-codecs">
            <div className="ack-feature-copy">
              <span className="ack-feature-index">BIDIRECTIONAL CODECS</span>
              <h3>Decode the wire. Keep rich Dart values.</h3>
              <p>AI providers exchange JSON strings. <code>Ack.datetime()</code> validates that wire value, decodes it to UTC <code>DateTime</code>, and encodes it back for the next boundary.</p>
              <Link href="/documentation/ack/advanced/codecs">Meet codecs <span aria-hidden="true">→</span></Link>
            </div>
            <div className="ack-codec-comparison" aria-label="Ack datetime codec comparison">
              <div className="ack-codec-heading">
                <code><span className="tok-type">Ack</span>.<span className="tok-call">datetime</span>()</code>
                <span>VALIDATE · DECODE · ENCODE</span>
              </div>
              <div className="ack-codec-values">
                <div className="ack-codec-value">
                  <div><small>WIRE VALUE</small><span>String</span></div>
                  <code><span className="tok-string">"2026-07-15T12:00:00Z"</span></code>
                </div>
                <div className="ack-codec-axis" aria-hidden="true">
                  <span>decode</span><i /><span>encode</span>
                </div>
                <div className="ack-codec-value is-runtime">
                  <div><small>DART VALUE</small><span>DateTime</span></div>
                  <code><span className="tok-type">DateTime</span>.<span className="tok-call">utc</span>(<span className="tok-number">2026</span>, <span className="tok-number">7</span>, <span className="tok-number">15</span>, <span className="tok-number">12</span>)</code>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="ack-cta-wrap ack-shell" aria-labelledby="ack-cta-title">
        <div className="ack-cta">
          <div>
            <span className="ack-eyebrow">START WITH ONE BOUNDARY</span>
            <h2 id="ack-cta-title">Make unknown data explicit.</h2>
            <p>Add Ack, describe the shape you expect, and keep the rest of your Dart code focused on trusted values.</p>
          </div>
          <div className="ack-cta-actions">
            <div className="ack-install" aria-label="Install Ack with Dart">
              <span aria-hidden="true">$</span>
              <code>dart pub add ack</code>
            </div>
            <Link className="ack-button ack-button-primary" href="/documentation/ack/getting-started/installation">
              Read installation <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
